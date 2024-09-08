import { useLocation } from "react-router-dom";

export function convertToBase64(file: File): Promise<string> {
return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // Reads file into Base64
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
    resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
    reject(error);
    };
});
}

export function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  