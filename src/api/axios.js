// import a from ''
import axios from "axios";
const service = axios.create({
  baseURL: "https://music.163.com",
  timeout: 20000,
});
service.interceptors.request.use();
service.interceptors.response.use(
  (response) => {
    const { result } = response.data;
    return result;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);
export default service;
