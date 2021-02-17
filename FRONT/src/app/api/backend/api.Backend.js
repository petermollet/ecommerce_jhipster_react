import axios from "axios";
import { getToken } from "../../shared/services/tokenServices";

const apiBackEnd = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})
export default apiBackEnd;


apiBackEnd.interceptors.request.use( request => {
    request.headers['Authorization'] = `Bearer ${ getToken() }`;
    return request;
})

apiBackEnd.interceptors.response.use(
    response => {
        console.log(response.status);
        return response;
    },
    error => {
        console.log(error);
        return error;
    }
)