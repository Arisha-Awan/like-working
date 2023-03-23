import React from "react";
import Sidebar from "./Sidebar";
import './Create.css';
import { useState, useContext } from "react";
import {InscribleContext} from '../context/Context'
import Loader from "./Loader";
import axios from "axios";

const Create = ()=>{

    const {contract, provider} = useContext(InscribleContext);
    
    const [isUploading, setIsUploading] = useState(false);
    const [filename, setFilename] = useState("No file choosen!");
    const [file, setFile] = useState(null);
    const [imageText, setImageText] = useState({
        textOnImage: "",
    });
    const [caption, setCaption] = useState({
        descriptionBox: ""
    });

    const retrieveFile = (e)=>{
        const image = e.target.files[0]; //files array of files object

        let imgPrev = document.getElementById('img-preview');
        let imgPrevCont = document.getElementById('img-preview-container');
        
        let reader = new FileReader();
        reader.readAsArrayBuffer(image);
        reader.onload = function(e) {
            imgPrev.src = e.target.result;
            setFile(image);
        };
        // reader.readAsDataURL(image);
        imgPrevCont.style.display = 'flex';
        imgPrevCont.style.justifyContent = 'center';
        imgPrevCont.style.alignItems = 'center';
        setFilename(image.name);
        e.preventDefault();
    };

    const displayTextOnImage =()=>{
        let division = document.getElementById("text-on-img-container");
        if (division.style.display === 'block') {
            division.style.display = 'none'
        }
        else{
            division.style.display = 'block';
        }        
    };


    //to set text on image------------------
    const addToImage = (e)=>{
        const value = e.target.value;
        setImageText({...imageText, textOnImage : value});
    };


    const saveCaption = (e)=>{
        const value = e.target.value;
        setCaption({...caption, descriptionBox : value})
        
    }


    //
    const saveData = async (e)=>{
        setIsUploading(true);
        e.preventDefault();
        if (file) {
        try {
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
            console.log("My image hash : ", ImgHash);

            const signer = contract.connect(provider.getSigner());
            signer.addPostImage(ImgHash, caption.descriptionBox, imageText.textOnImage);
        } catch (e) {
            alert("Unable to upload image to Pinata");
        }
        } else {
        setFilename("No image selected");
        }
        alert("Successfully Image Uploaded");
        setFile(null);
        setIsUploading(false);
    };

    return(
        <>
            <Sidebar />
            <div className="container new-post-container-main">
                {isUploading ?
                    <Loader /> 
                    :
                    <>
                    <div className="new-post-container">
                        <div>
                            <label htmlFor="btn-choose" id="lb-btn-choose">Choose Image</label>
                            <input type="file" name="btn-choose" id="btn-choose" onChange={retrieveFile} />
                            <div>
                                <span className="image-name">Image : {filename}</span>
                            </div>
                        </div>
                        <button className="add-text-on-image btn btn-primary" onClick={displayTextOnImage}>Add Text On Image</button>
                    </div>
                    <div className="text-on-img-container" id="text-on-img-container">
                        <input type="text" name="textOnImage" id="text-on-img" className="form-control" placeholder="Add text on image" value={imageText.textOnImage} onChange={addToImage}/>
                    </div>
                    <div className="description-container">
                        <label htmlFor="description-box">Enter Caption: </label>
                        <input type="text" name="descriptionBox" id="descriptionBox" className="form-control" value={caption.descriptionBox} onChange={saveCaption}/>
                    </div>
                    <div className="img-preview-container" id="img-preview-container">
                        <img id="img-preview" alt="Could'nt provide preview"/>
                        <div className="img-text-container">
                            <span className="img-text" id="img-text">{imageText.textOnImage}</span>
                        </div>
                    </div>
                    <div className="btn-upload-container">
                        <button className="btn btn-default" id="btn-upload" onClick={saveData} disabled={!file}>Upload</button>
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default Create;