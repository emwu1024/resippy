import React, { useState } from "react";
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
  const handleFileUpload = async (e: any) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let base64File = await convertToBase64(files[i]);
      props.setImages((prevImages) => {
        const updatedImages = [...prevImages, base64File as string];
        console.log(`${i} IMAGE:`, updatedImages[i]);
        return updatedImages;
      });
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-field-container">
          <label className="form-label">
            Recipe Steps (Start another step with a new line)
          </label>
          <textarea
            onChange={(e) => props.setSteps(e.target.value)}
            className="form-field"
            rows={10}
            value={props.steps}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">
            Ingredients (Separate ingredients with a new line)
          </label>
          <textarea
            onChange={(e) => props.setIngredients(e.target.value)}
            className="form-field"
            rows={10}
            value={props.ingredients}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label" htmlFor="image-upload-input">
            Images
            {/* Replace Images with an image element or icon that better represents uploading files */}
          </label>
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
