import axios from "axios";
const serve = axios.create({
  baseURL: "/api",
  timeout: 20000,
});
serve.interceptors.response.use(
  (response) => {
    const { result } = response.data;
    return result;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);
export default serve;
