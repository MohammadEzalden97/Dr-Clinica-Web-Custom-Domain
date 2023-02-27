import axios from 'axios'
import swal from 'sweetalert'
import configData from '../constants/config.json'

const axiosClient = axios.create({
    baseURL: configData.SERVER_URL ,
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "accesstoken" : configData.ACCESSTOKEN,
        "logintoken" : localStorage.getItem('loginToken')
    }
});

axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
        swal({
            title: "Server Not Responding",
            text: "Please try again later",
            icon: "warning",
            button: "ok",
        })
        console.log(error)
      return Promise.reject(error);
    }
);

export default axiosClient 