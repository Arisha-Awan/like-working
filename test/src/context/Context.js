import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  ConnectWithContract,
  ConnectWallet,
  MapDataToFrontend,
} from "../Utils/API";

//CREATING CONTEXT
export const InscribleContext = React.createContext();

//CREATING CONTEXT PROVIDER
export const InscribleProvider = ({ children }) => {
  //likeeee

  const [appData, setAppData] = useState([]);
  const [account, setAccount] = useState("");
  const [userList, setUserLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [friendMsg, setFriendMsg] = useState([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //FUNCTION TO GET ALL THE POSTS FROM BLOCKCHAIN
  const fetchData = async () => {
    try {
      setisLoading(true);
      console.log("helllo arisha hello arisha");

      //GET CONTRACT
      const contract = await ConnectWithContract();

      //GET ACCOUNT
      const connectAccount = await ConnectWallet();
      setAccount(connectAccount);

      //GETTING CURRENTLY LOGGED USERNAME
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);

      //GETTING ALL REGISTERED USERS
      const userList = await contract.getAllAppUser();
      // console.log(userList);
      setUserLists(userList);

      //GETTING POST DATA
      let data = await contract.getAllPosts();
      console.log("calllingggggggggggggggg");
      console.log("data", data);
      console.log("first element of data array", parseInt(data[0][7]._hex, 16));

      // sorting posts in desecending order
      // data.sort((a, b) => b.name.localeCompare(a.name));
      let dataCopy = [...data];

      // sorting posts in descending order
      dataCopy.sort((a, b) => {
        let val1 = b.likeCount.toNumber();
        let val2 = a.likeCount.toNumber();
        return val1 - val2;
      });

      setAppData(MapDataToFrontend(dataCopy));

      console.log("calling useState after setAppdata");
      console.log(appData);

      setisLoading(false);
    } catch (error) {
      setErrorTitle("NO Metamask Account FOUND");
      setErrorMessage("Please install and connect to Wallet!");
      setisLoading(false);
    }
  };

  //FUNCTION TO UPLOAD NEW DATA TO BLOCKCHAIN
  const uploadData = async (file, imageText, caption) => {
    try {
      setisLoading(true);

      //CREATING ISTANCE OF CONTRACT
      const contract = await ConnectWithContract();

      //UPLOADING FILE TO PINATA
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `9fb649761b35eaeed2fd`,
          pinata_secret_api_key: `3bd0c4fcfd38a4594d59561d5600a4ac282de92caa00ff36b3f6b98b25a60227`,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

      //ADDING DATA TO BLOCKCHAIN
      const add = await contract.addPostImage(
        ImgHash,
        caption.descriptionBox,
        imageText.textOnImage
      );
      await add.wait();
      setisLoading(false);
    } catch (e) {
      alert("Couldn't upload image!");
      setErrorTitle("FAILED TRANSACTION");
      setError(
        "Couldn't Perform Transaction. Please Check Your internet and Try Again!"
      );
      setisLoading(false);
    }
  };

  //READ MESSAGE/GET ALL MESSAGES
  const readMessage = async (friendAddress) => {
    try {
      const contract = await ConnectWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("Currently You Have no Message");
    }
  };

  //SEND MESSAGE TO YOUR FRIEND
  const sendMessage = async ({ msg, address }) => {
    try {
      const contract = await ConnectWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setisLoading(true);
      await addMessage.wait();
      setisLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //CREATE ACCOUNT
  const createAccount = async (name) => {
    try {
      console.log("inside ca");
      const contract = await ConnectWithContract();
      console.log(contract);
      const getCreatedUser = await contract.createAccount(name);
      console.log("calling");
      setisLoading(true);
      await getCreatedUser.wait();
      console.log("called");
      setisLoading(false);
      window.location.reload();
      console.log("donne");
    } catch (error) {
      setError("Error while creating your account Pleas reload browser");
    }
  };

  //READ USER INFO
  const readUser = async (userAddress) => {
    const contract = await ConnectWithContract();
    const userName = await contract.getUserName(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  // const CreateContract = async (prov) => {
  //     setIsContract(false);
  //     console.log("Create contract function called!!!");
  //     console.log("Provider sent to function is : " , prov);
  //     if (prov) {
  //       window.ethereum.on("chainChanged", () => {
  //         window.location.reload();
  //       });
  //       window.ethereum.on("accountsChanged", () => {
  //         window.location.reload();
  //       });
  //       await prov.send("eth_requestAccounts", []);
  //       const signer = prov.getSigner();

  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       console.log("Currently signed in user in metamask : ", address);
  //       let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  //       console.log("Checking ABI object : ", Signup_signin.abi);
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         Signup_signin.abi,
  //         signer
  //       );

  //       console.log("Checking Contract address : ", contract);
  //       setContract(contract);
  //       setProvider(prov);
  //     }
  //     else {
  //       setErrorTitle("Fatal Error");
  //       setErrorMessage("Metamask Extension is not installed!!");
  //     }
  //     setIsContract(true);
  // };

  /////like post front end
  const tip = async (post_id) => {
    // tip post owner
    const contract = await ConnectWithContract();
    await (
      await contract.tipPostOwner(post_id, {
        value: ethers.utils.parseEther("0.00001"),
      })
    ).wait();
    // console.log("this is callled in tip ");
    // console.log(appData[0]);
    fetchData();

    // loadPosts();
  };

  const like = async (post_id) => {
    const contract = await ConnectWithContract();

    await (await contract.incrementLike(post_id)).wait();

    fetchData();

    // loadPosts();
  };

  const MapDataToFrontend = (data) => {
    let images = data.map((item, i) => {
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
          <div className="d-inline mt-auto float-start">
            Total Tip:
            {
              //converting hexdecimal in to ethers
              parseInt(item[5]._hex, 16) / 10 ** 18
              // // convert to decimal
              // let decimalValue = parseInt(hexValue, 16);
              //  // convert to Wei
              // let weiValue = decimalValue * (10 ** 18);
              //  // convert to Wei
              // let etherValue = weiValue / (10 ** 18);
            }
          </div>
          <div className="d-inline float-end">
            <button
              className="btn btn-link btn-sm float-right pt-0"
              onClick={() => {
                // tip(item[6]._hex);
                // let id_todecimal = parseInt(item[6]._hex, 16);
                // tip(id_todecimal);

                //toNumber function convert the big number into integer
                tip(item[6].toNumber());
                // tip(item[5]._hex);
              }}
            >
              TIP 0.1 ETH
            </button>
            <button
              className="btn btn-link btn-sm float-right pt-0"
              onClick={() => {
                like(item[6].toNumber());
                // tip(item[5]._hex);
              }}
            >
              {item[7].toNumber()}
              Like
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
      );
    });

    return images;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InscribleContext.Provider
      value={{
        isLoading,
        appData,
        account,
        userList,
        errorTitle,
        errorMessage,
        friendMsg,
        error,
        userName,
        currentUserAddress,
        currentUserName,
        fetchData,
        uploadData,
        createAccount,
        readMessage,
        sendMessage,
        readUser,
        // fetchPostss
      }}
    >
      {children}
    </InscribleContext.Provider>
  );
};
