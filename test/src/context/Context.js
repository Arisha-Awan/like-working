import React,{useState} from 'react';
import { ethers } from "ethers";
import Signup_signin from "../artifacts/contracts/Signup_signin.sol/Signup_signin.json";

export const InscribleContext=React.createContext();

export const InscribleProvider=({children})=>{

    // const [formData, setformData] = useState({
    //     description: ""
    // });

    const [postsArr, setpostsArr] = useState([]);

    const [account, setAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [isContract, setIsContract] = useState(false);

    // const [isConnected, setisConnected] = useState(false)
    const [isLoading, setisLoading] = useState(false);


    //function to get images from blockchain
    const getAllImages = async(contract) =>{
      setisLoading(true);

      let dataArray;
      try {
      dataArray =  await contract.getAllPosts();
      const images = dataArray.map((item, i) => {
      return (
          <div className="single-post-container">
          <span className="account-name">USER ADDRESS:{item[0]}</span>
          <div className="image-container">
              <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item[1].substring(6)}`}
              alt="new"
              className="image-list"
              ></img>
              <div className="img-text-container">
                  <span className="img-text" id="img-text">{item[3]}</span>
              </div>
          </div>
          <div className="discription">
              <span className="discription-text">{item[2]}</span>
          </div>
          <hr />
          </div>
      );
      });
      setpostsArr(images); 
      setisLoading(false);   
      }catch(e){
          alert("You don't have access")
      }      
    };

    const CreateContract = async (prov) => {
        setIsContract(false);
        console.log("Create contract function called!!!");
        console.log("Provider sent to function is : " , prov);
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
          setAccount(address);
          console.log("Currently signed in user in metamask : ", address);
          let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
          console.log("Checking ABI object : ", Signup_signin.abi);
          const contract = new ethers.Contract(
            contractAddress,
            Signup_signin.abi,
            signer
          );
  
          console.log("Checking Contract address : ", contract);
          setContract(contract);
          setProvider(prov);
        } 
        else {
          setErrorTitle("Fatal Error");
          setErrorMessage("Metamask Extension is not installed!!");
        }
        setIsContract(true);
    };

    return(
        <InscribleContext.Provider value={{
        isLoading,
        isContract,
        postsArr,
        contract,
        account,
        provider,
        errorMessage,
        errorTitle,
        CreateContract,
        getAllImages}}>
            {children}
        </InscribleContext.Provider>
    );
}