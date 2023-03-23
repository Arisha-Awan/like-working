import React, { useContext, useEffect, useState } from "react";
import './Post.css';
import Sidebar from './Sidebar';
import Loader from "./Loader";
import {InscribleContext} from '../context/Context';


const Post = () => {

    // const {isLoading, postsArr} = useContext(InscribleContext);

    const {contract, account, isContract} = useContext(InscribleContext);
    const [postsArr,setpostsArr] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getAllImages = async(contract) =>{
        setisLoading(true);
    //     const arr = [image0, image1, image2, image3, image4, image4, image5];        
    //    const images =await arr.map((item, i) => {
    //             return (
    //                 <>
    //                     <div className="single-post-container" key={i}>
    //                         <span className="account-name">My Account</span>
    //                         <div className="image-container">
    //                                 <a href={item} key={i} >
    //                                 <img
    //                                     key={i}
    //                                     src={item}
    //                                     alt="new"
    //                                     className="image-list"
    //                                 ></img>
    //                             </a>
    //                         </div>
    //                         <span className="account-name" >My Account:
    //                             <span className="description-text">This is the discription of my image</span>
    //                         </span>
    //                     </div>
    //                     <hr />
    //                 </>
    //             );
    //         });

    //         setTimeout(() => {
    //             setisLoading(false);
    //         }, 5000);

    //         setpostsArr(images);

        let dataArray;
        try {
        // dataArray = await contract.display(account);

        dataArray =  await contract.getAllPosts();
        console.log(dataArray);
        // // console.log("arrayyyy", dataArray);
        // // console.log("typeeeee of varrrr", dataArray);
        // } catch (e) {
        // //alert("You don't have access");
        // }

        // const str = await dataArray.toString();
        // const str_array = str.split(",");
        // console.log(str);
        // // console.log(str_array);
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

    useEffect(()=>{
        getAllImages(contract);
    },[isContract])

    return (
        <>
            <Sidebar />
            <div className="container post-main-container">
                {!isLoading ? 
                    postsArr
                    // <span>testing</span>
                    : <Loader/>}
            </div>
        </>
    )
}

export default Post;