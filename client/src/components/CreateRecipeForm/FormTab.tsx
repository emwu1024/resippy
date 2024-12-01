import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { IconContext } from "react-icons";
import "./FormTab.css";
import { convertToBase64 } from "../../utils/utils";

interface FormTabProps {
  steps: string;
  ingredients: string;
  images: Array<string>;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const FormTab = (props: FormTabProps) => {
  const [fileNames, setFileNames] = useState<File[]>([]);

  const handleMultipleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filesArray = Array.from(e.target.files || []);
    setFileNames(filesArray);
    for (let i = 0; i < filesArray.length; i++) {
      let base64File = await convertToBase64(filesArray[i]);
      props.setImages((prevImages) => {
        const updatedImages = [...prevImages, base64File as string];
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
            {fileNames.length > 0 ? (
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
