import React, { useState } from "react";

import { LuImagePlus } from "react-icons/lu";
import { IconContext } from "react-icons";
import { IoCloseCircle } from "react-icons/io5";

import "./FormTab.css";
import { convertToBase64 } from "../../utils/utils";
import { ImageList } from "@mui/material";

interface FormTabProps {
  steps: string;
  ingredients: string;
  images: Array<File>;
  isImagesDifferent?: boolean;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<Array<File>>>;
  setIsImagesDifferent?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormTab = (props: FormTabProps) => {
  const [base64Array, setBase64Array] = useState<Array<string>>([]);

  const handleMultipleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      props.isImagesDifferent !== undefined &&
      props.setIsImagesDifferent !== undefined
    ) {
      console.log("SETTING ISIMAGESDIFFERENT VALUE:");
      console.log("Before: " + props.isImagesDifferent);
      props.setIsImagesDifferent(true);
      console.log("After: " + props.isImagesDifferent);
    }
    const filesArray = Array.from(e.target.files || []);
    for (let i = 0; i < filesArray.length; i++) {
      let base64File = await convertToBase64(filesArray[i]);

      props.setImages((prevImages) => {
        const updatedImages = [...prevImages, filesArray[i]];
        return updatedImages;
      });

      setBase64Array((prevImages) => {
        const updatedImages = [...prevImages, base64File as string];
        return updatedImages;
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (
      props.isImagesDifferent !== undefined &&
      props.setIsImagesDifferent !== undefined
    ) {
      console.log("SETTING ISIMAGESDIFFERENT VALUE:");
      console.log("Before: " + props.isImagesDifferent);
      props.setIsImagesDifferent(true);
      console.log("After: " + props.isImagesDifferent);
    }
    const updatedImages = props.images.filter((_, i) => i !== index);
    const updatedBase64 = base64Array.filter((_, i) => i !== index);
    props.setImages(updatedImages);
    setBase64Array(updatedBase64);
    console.log("After props.images Length: " + props.images.length);
  };

  return (
    <div>
      <div className="form-tab-container">
        <div className="form-field-container">
          <label className="form-label">Recipe Steps</label>
          <textarea
            onChange={(e) => props.setSteps(e.target.value)}
            className="form-field"
            rows={8}
            value={props.steps}
          />
          <p className="help-text">Start another step with a new line</p>
        </div>
        <div className="form-field-container">
          <label className="form-label">Ingredients</label>
          <textarea
            onChange={(e) => props.setIngredients(e.target.value)}
            className="form-field"
            rows={8}
            value={props.ingredients}
          />
          <p className="help-text">Separate ingredients with a new line</p>
        </div>
        <div className="form-field-container">
          <label className="form-label" htmlFor="image-upload-input-multiple">
            <p>Images</p>
          </label>

          <label
            className="form-label btn-upload-image vertical-centre"
            htmlFor="image-upload-input-multiple"
          >
            <IconContext.Provider value={{ color: "#e1be96", size: "30px" }}>
              <LuImagePlus />
            </IconContext.Provider>
            {props.images.length > 0 ? (
              <span className="upload-desc">
                {props.images.length} files uploaded
              </span>
            ) : (
              <span className="upload-desc">Upload Images Here</span>
            )}
          </label>
          {/* {fileNames.map((file, index) => {
            return (
              <p className="file-name-text" key={index}>
                {file.name}
              </p>
            );
          })} */}

          {props.images.length > 0 && (
            <p>{props.images.length} images have been uploaded</p>
          )}
          {props.images.map((image, index) => {
            console.log("Image Type: ");
            console.log(typeof image);
            return (
              <div className="uploaded-image-container">
                <button
                  className="remove-icon-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  <IconContext.Provider
                    value={{
                      color: "#e1be96",
                      size: "20px",
                      className: "remove-icon",
                    }}
                  >
                    <IoCloseCircle />
                  </IconContext.Provider>
                </button>
                <img
                  className="uploaded-image"
                  src={
                    typeof image != "object"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt=""
                />
              </div>
            );
          })}

          <input
            type="file"
            name="images"
            id="image-upload-input-multiple"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleMultipleFileUpload(e)}
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default FormTab;
