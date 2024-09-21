import axios from "axios";
import { getItem } from "../utils/localStorage";

axios.defaults.baseURL = "http://localhost:3000/api/";

axios.interceptors.request.use((config) => {
   config.headers.Authorization = "Bearer " + getItem("token");
   return config;
});
axios.interceptors.response.use(
   (resp) => resp,
   async (error) => {
      if (error.response.status === 401) {
         window.location.href = "/signin";
      }
      return Promise.reject(error);
   }
);
export default axios;
