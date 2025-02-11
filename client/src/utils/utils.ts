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
  
export function formatDate(date : Date): string {
let day: number | string = date.getDate();
let month: number | string = date.getMonth()+1;

if (day < 10 ) {
    day = '0' + day;
}

if (month < 10 ) {
    month = '0' + month;
}

let formattedDate = day + '.' + month + '.' + date.getFullYear();
return formattedDate.toString()
}

