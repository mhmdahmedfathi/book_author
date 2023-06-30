import axios from "axios";
import { base_url } from "./backend";

let AxiosConfiged =axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${localStorage.getItem("token")}`
    }
});

export default AxiosConfiged;