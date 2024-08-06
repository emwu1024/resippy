import React, { useState } from "react";
// import { MdOutlineFileUpload } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { IconContext } from "react-icons";
import "./CreateRecipeForm.css";

interface CreateRecipeFormProps {
  steps: string;
  ingredients: string;
  images: Array<string>;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const CreateRecipeForm = (props: CreateRecipeFormProps) => {
  const [fileNames, setFileNames] = useState<File[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files || []);
    setFileNames(filesArray);
    for (let i = 0; i < filesArray.length; i++) {
      let base64File = await convertToBase64(filesArray[i]);
      props.setImages((prevImages) => {
        const updatedImages = [...prevImages, base64File as string];
        console.log(`${i} IMAGE:`, updatedImages[i]);
        return updatedImages;
      });
    }
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
          <label className="form-label" htmlFor="image-upload-input">
            <p>Images</p>
          </label>

          <label
            className="form-label btn-upload-image vertical-centre"
            htmlFor="image-upload-input"
          >
            <IconContext.Provider value={{ color: "#e1be96", size: "30px" }}>
              <LuImagePlus />
            </IconContext.Provider>
            {fileNames.length != 0 ? (
              <span className="upload-desc">
                {fileNames.length} files uploaded
              </span>
            ) : (
              <span className="upload-desc">Upload Images Here</span>
            )}
          </label>
          {fileNames.map((file, index) => {
            return (
              <p className="file-name-text" key={index}>
                {file.name}
              </p>
            );
          })}

          <input
            type="file"
            name="images"
            id="image-upload-input"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
            multiple
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;

function convertToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // Reads into Base64
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
