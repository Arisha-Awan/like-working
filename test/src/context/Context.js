import React,{useState, useEffect} from 'react';
import { ethers } from "ethers";
import Signup_signin from "../artifacts/contracts/Signup_signin.sol/Signup_signin.json";


// import image0 from "../Images/596296.jpeg";
// import image1 from "../Images/681016.jpg";
// import image2 from "../Images/976013.jpg";
// import image3 from "../Images/987919.jpg";
// import image4 from "../Images/mosque.jpg";
// import image5 from "../Images/rain.jpg";

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
    // const getAllImages = async(c) =>{
    //   console.log("Inside the getAllImages function");
    //     setisLoading(true);
    // //     const arr = [image0, image1, image2, image3, image4, image4, image5];        
    // //    const images =await arr.map((item, i) => {
    // //             return (
    // //                 <>
    // //                     <div className="single-post-container" key={i}>
    // //                         <span className="account-name">My Account</span>
    // //                         <div className="image-container">
    // //                                 <a href={item} key={i} >
    // //                                 <img
    // //                                     key={i}
    // //                                     src={item}
    // //                                     alt="new"
    // //                                     className="image-list"
    // //                                 ></img>
    // //                             </a>
    // //                         </div>
    // //                         <span className="account-name" >My Account:
    // //                             <span className="description-text">This is the discription of my image</span>
    // //                         </span>
    // //                     </div>
    // //                     <hr />
    // //                 </>
    // //             );
    // //         });

    // //         setTimeout(() => {
    // //             setisLoading(false);
    // //         }, 5000);

    // //         setpostsArr(images);

    //     let dataArray;
    //     try {
    //     // dataArray = await contract.display(account);

    //     dataArray =  await c.getAllPosts();
    //     // console.log("arrayyyy", dataArray);
    //     // console.log("typeeeee of varrrr", dataArray);
    //     } catch (e) {
    //     //alert("You don't have access");
    //     }

    //     const str = await dataArray.toString();
    //     const str_array = str.split(",");
    //     console.log(str);
    //     // console.log(str_array);
    //     const images = str_array.map((item, i) => {
    //     return (
    //         <div className="single-post-container">
    //         <span className="account-name">USER ADDRESS:{account}</span>
    //         <div className="image-container">
    //             <img
    //             key={i}
    //             src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
    //             alt="new"
    //             className="post-image"
    //             ></img>
    //         </div>
    //         {/* <div className="discription">
    //             <span className="discription-text">this is post discription</span>
    //         </div> */}
    //         <hr />
    //         </div>
    //     );
    //     });
    //     setpostsArr(images); 
    //     setisLoading(false);         
    // };

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
        // getAllImages(contract);
        setIsContract(true);
    };

    // useEffect(() => {
    //     const prov = new ethers.providers.Web3Provider(window.ethereum);
    //     CreateContract(prov);
    //     // getAllImages(contract);
    // },[]);

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
        CreateContract}}>
            {children}
        </InscribleContext.Provider>
    );
}