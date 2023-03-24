import React, { useContext, useEffect, useState } from "react";
import {Sidebar, Loader} from '../index';
import {InscribleContext} from '../../context/Context';
import './Post.css';

const Post = () => {

    // const {isLoading, postsArr} = useContext(InscribleContext);

    const {contract, isContract, getAllImages, postsArr, isLoading} = useContext(InscribleContext);
    // const [postsArr,setpostsArr] = useState([]);
    // const [isLoading, setisLoading] = useState(false);

    // const getAllImages = async(contract) =>{
    //     setisLoading(true);

    //     let dataArray;
    //     try {
    //     dataArray =  await contract.getAllPosts();
    //     const images = dataArray.map((item, i) => {
    //     return (
    //         <div className="single-post-container">
    //         <span className="account-name">USER ADDRESS:{item[0]}</span>
    //         <div className="image-container">
    //             <img
    //             key={i}
    //             src={`https://gateway.pinata.cloud/ipfs/${item[1].substring(6)}`}
    //             alt="new"
    //             className="image-list"
    //             ></img>
    //             <div className="img-text-container">
    //                 <span className="img-text" id="img-text">{item[3]}</span>
    //             </div>
    //         </div>
    //         <div className="discription">
    //             <span className="discription-text">{item[2]}</span>
    //         </div>
    //         <hr />
    //         </div>
    //     );
    //     });
    //     setpostsArr(images); 
    //     setisLoading(false);   
    //     }catch(e){
    //         alert("You don't have access")
    //     }      
    // };

    useEffect(()=>{
        getAllImages(contract);
    },[isContract])

    return (
        <>
            <Sidebar />
            <div className="post-main-container container">
                {!isLoading ? 
                    postsArr
                    // <span>testing</span>
                    : <Loader/>}
            </div>
        </>
    )
}

export default Post;