import { BASE_URL } from "../assets/conf";
import axios from "axios"

export default async function login(formData){
    const result = await axios.post(BASE_URL + "/token/", formData);
    return result.data;
}

