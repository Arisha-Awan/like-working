import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Loader } from "../index";
import { useState, useContext } from "react";
import { InscribleContext } from "../../context/Context";
import "./Create.css";

const Create = () => {
  const { uploadData, isLoading } = useContext(InscribleContext);
  const [filename, setFilename] = useState("No file choosen!");
  const [file, setFile] = useState(null);
  const [imageText, setImageText] = useState({
    textOnImage: "",
  });
  const [caption, setCaption] = useState({
    descriptionBox: "",
  });

  const navigate = useNavigate();

  //READING FILE THAT USER UPLOADED
  const retrieveFile = (e) => {
    const image = e.target.files[0]; //files array of files object

    // let imgPrev = document.getElementById('img-preview');
    // let imgPrevCont = document.getElementById('img-preview-container');

    let reader = new FileReader();
    reader.readAsArrayBuffer(image);
    reader.onload = function (e) {
      // imgPrev.src = e.target.result;
      setFile(image);
    };
    // reader.readAsDataURL(image);
    // imgPrevCont.style.display = 'flex';
    // imgPrevCont.style.justifyContent = 'center';
    // imgPrevCont.style.alignItems = 'center';
    setFilename(image.name);
    imagePreview(e);
    e.preventDefault();
  };

  //TO SHOW IMAGE PREVIEW TO USER
  const imagePreview = (e) => {
    const image = e.target.files[0]; //files array of files object

    let imgPrev = document.getElementById("img-preview");
    let imgPrevCont = document.getElementById("img-preview-container");

    let reader = new FileReader();
    reader.onload = function (e) {
      imgPrev.src = e.target.result;
    };
    reader.readAsDataURL(image);
    imgPrevCont.style.display = "flex";
    imgPrevCont.style.justifyContent = "center";
    imgPrevCont.style.alignItems = "center";
  };

  //SETTING TEXT ON IMAGE
  const displayTextOnImage = () => {
    let division = document.getElementById("text-on-img-container");
    if (division.style.display === "block") {
      division.style.display = "none";
    } else {
      division.style.display = "block";
    }
  };

  //ADDING IMAGE TEXT(IF ANY) TO USESTATE
  const addToImage = (e) => {
    const value = e.target.value;
    setImageText({ ...imageText, textOnImage: value });
  };

  //ADDING POST CAPTION TO USESTATE
  const saveCaption = (e) => {
    const value = e.target.value;
    setCaption({ ...caption, descriptionBox: value });
  };

  //TO UPLOAD ALL THE DATA OF THE POST TO THE BLOCKCHAIN
  const saveData = async (e) => {
    e.preventDefault();
    if (file) {
      uploadData(file, imageText, caption);
      setFile(null);
      navigate("/inscrible");
    } else {
      setFilename("No image selected");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container new-post-container-main">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="new-post-container">
              <div>
                <label htmlFor="btn-choose" id="lb-btn-choose">
                  Choose Image
                </label>
                <input
                  type="file"
                  name="btn-choose"
                  id="btn-choose"
                  onChange={retrieveFile}
                />
                <div>
                  <span className="image-name">Image : {filename}</span>
                </div>
              </div>
              <button
                className="add-text-on-image btn btn-primary"
                onClick={displayTextOnImage}
              >
                Add Text On Image
              </button>
            </div>
            <div className="text-on-img-container" id="text-on-img-container">
              <input
                type="text"
                name="textOnImage"
                id="text-on-img"
                className="form-control"
                placeholder="Add text on image"
                value={imageText.textOnImage}
                onChange={addToImage}
              />
            </div>
            <div className="description-container">
              <label htmlFor="description-box">Enter Caption: </label>
              <input
                type="text"
                name="descriptionBox"
                id="descriptionBox"
                className="form-control"
                value={caption.descriptionBox}
                onChange={saveCaption}
              />
            </div>
            <div className="img-preview-container" id="img-preview-container">
              <img id="img-preview" alt="Could'nt provide preview" />
              <div className="img-text-container">
                <span className="img-text" id="img-text">
                  {imageText.textOnImage}
                </span>
              </div>
            </div>
            <div className="btn-upload-container">
              <button
                className="btn btn-default"
                id="btn-upload"
                onClick={saveData}
                disabled={!file}
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Create;
