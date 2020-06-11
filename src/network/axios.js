// * axios的封装  方便管理请求
const axios = require("axios");

export function request(config) {
  const instanse = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
  });

  //* 请求拦截
  instanse.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  //* 响应拦截
  instanse.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );

  //* 返回Promise --> axios的实例对象
  return instanse(config);
}
