import axios from "axios"
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: "http://localhost:8000/"
});

// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     config.headers.Authorization = 'Bearer ' + getToken();
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

instance.interceptors.response.use(function (response) {
    return response;

}, function (error) {
    if (error.response.status === 404) {
        toast.error(error?.message)
    }
    return Promise.reject(error);
})

export default instance;