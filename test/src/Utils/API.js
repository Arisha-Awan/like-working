import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Web3 from "web3";
import React, { useState, useEffect } from "react";

import { contractAddress, contractABI } from "../context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask!");

    //GETTING ACCOUNTS ARRAY FROM ETHEREUM
    const accounts = window.ethereum.request({
      method: "eth_accounts",
    });

    //GETTING THE FIRST ACCOUNT FROM ACCOUNT ARRAY
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask!");
    //GETTING ACCOUTNS ARRAY FROM ETHEREUM/METAMASK
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    //GETTING FIRST ACCOUNT FROM ACCOUNTS ARRAY
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const FetchContract = (signerProvider) =>
  new ethers.Contract(contractAddress, contractABI, signerProvider);

export const ConnectWithContract = async () => {
  try {
    //CREATING A ETHEREUM PROVIDER AND GETTING THE SIGNER
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    const signer = provider.getSigner();

    //SENDING THE SIGNER TO FetchContract FUNCTION TO GET THE SMART CONTRACT
    const contract = FetchContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

const tipImageOwners = async (postCreatorAddress, post_id) => {
  // const [postTipAmount, setPostTipAmount] = useState(0);
  //CREATING ISTANCE OF CONTRACT
  const contract = await CreateContract();

  const web3Modal = new Web3Modal();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const tipAmount = web3.utils.toWei("0.1", "Ether");
  const currently_loggedIn = await ConnectWallet();

  const success = await web3.eth.sendTransaction({
    from: currently_loggedIn,
    to: postCreatorAddress,
    value: tipAmount,
  });
  if (success) {
    alert("successfulll Tip is given to user");
    let postTip = await contract.incrementTipAmount(2, tipAmount);
    alert("01 amount is sendddddddddddd");
    console.log("Tipppppppppppppp", postTip);
  } else alert("saddd Tip is not given to user");
};

export const CreateContract = async () => {
  const prov = new ethers.providers.Web3Provider(window.ethereum);

  if (prov) {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    await prov.send("eth_requestAccounts", []);
    const signer = prov.getSigner();

    const address = await signer.getAddress();
    console.log("Currently signed in user in metamask : ", address);
    console.log("Checking ABI object : ", contractABI);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Checking Contract address : ", contract);

    return contract;
  } else {
    console.log("no provivder");
  }
};

export const MapDataToFrontend = (data) => {
  const images = data.map((item, i) => {
    return (
      <div className="single-post-container">
        <span className="account-name">{item[0]}</span>
        <br></br>
        <span className="account-address">{item[1]}</span>
        <div className="image-container">
          <img
            key={i}
            src={`https://gateway.pinata.cloud/ipfs/${item[2].substring(6)}`}
            alt="new"
            className="image-list"
          ></img>
          <div className="img-text-container">
            <span className="img-text" id="img-text">
              {item[4]}
            </span>
          </div>
        </div>
        <div className="description">
          <span className="discription-text">{item[3]}</span>
        </div>
        <hr />
        {/* coding for like */}
        <div className="btn btn-link btn-sm float-right pt-0">
          Total Tip
          <span className="discription-text">{item[5]._hex}</span>
        </div>
        <div>
          <button
            className="btn btn-link btn-sm float-right pt-0"
            onClick={() => {
              // let tipAmount = window.web3.utils.toWei("0.1", "Ether");
              // console.log(event.target.name, tipAmount);

              tipImageOwners(item[1], item[6]._hex);
            }}
          >
            TIP 0.1 ETH
          </button>
        </div>
      </div>
    );
  });
  return images;
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "  Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
