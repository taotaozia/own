import axios from "axios";

const serverUrl = "http://192.168.3.237:8989/api";
const request = axios.create({
  baseURL: serverUrl, timeout: 50000
});

// request 拦截器
// 可以在请求前对请求做一些处理
// 比如同一加 token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  // const adminID = Cookies.get("adminID");
  // if (admin !== undefined) {
  //   config.headers["token"] = JSON.parse(admin).token;
  // }
  return config;
}, error => {
  return Promise.reject(error);
});

// response 拦截器
// 可以在接口响应后同一处理结果
request.interceptors.response.use(response => {
    let res = response.data;
    //兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  error => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default request;

export const uploadPost = (url, data) => {
  return axios({
      url: serverUrl + url,
      method: "post",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
      processData: false
    }
  );
};
export const download = (url) => {
  return axios({
      url: serverUrl + url,
      method: "get",
      responseType: "blob",
      // headers: { "Content-Type": "multipart/form-data" }
    }
  );
};