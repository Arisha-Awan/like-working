import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreateContract, MapDataToFrontend } from '../Utils/API';


//CREATING CONTEXT
export const InscribleContext = React.createContext();


//CREATING CONTEXT PROVIDER
export const InscribleProvider = ({ children }) => {

  const [appData, setAppData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [isLoading, setisLoading] = useState(false);

  //FUNCTION TO GET ALL THE POSTS FROM BLOCKCHAIN
  const fetchData = async () => {
    try {
      setisLoading(true);

      //CREATING ISTANCE OF CONTRACT
      const contract = await CreateContract();

      //GETTING DATA BY CALLING SMART CONTRACT FUNCTION
      const data = await contract.getAllPosts();

      setAppData(MapDataToFrontend(data));
      setisLoading(false);
    } catch (error) {
      setErrorTitle("NO Metamask Account FOUND");
      setErrorMessage("Please install and connect to Wallet!");
      setisLoading(false);
    }
  };

  //FUNCTION TO UPLOAD NEW DATA TO BLOCKCHAIN
  const uploadData = async(file, imageText, caption) => {
    try {
      setisLoading(true);

      //CREATING ISTANCE OF CONTRACT
      const contract = await CreateContract();

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
      await contract.addPostImage(ImgHash, caption.descriptionBox, imageText.textOnImage);
      alert("Successfully Image Uploaded");
      setisLoading(false);
    } catch (e) {
      alert("Couldn't upload image!");
      setErrorTitle("FAILED TRANSACTION");
      setErrorMessage("Couldn't Perform Transaction. Please Check Your internet and Try Again!");
      setisLoading(false);
    }
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
    setAppData(fetchData());
  }, [])

  return (
    <InscribleContext.Provider value={{
      isLoading,
      appData,
      errorTitle,
      errorMessage,
      uploadData
    }}>
      {children}
    </InscribleContext.Provider>
  );
}