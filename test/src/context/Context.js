import React, { useState, useEffect } from "react";
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
      console.log(userList);
      setUserLists(userList);

      //GETTING POST DATA
      const data = await contract.getAllPosts();
      console.log("calllingggggggggggggggg");
      console.log("data", data);
      setAppData(MapDataToFrontend(data));

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
