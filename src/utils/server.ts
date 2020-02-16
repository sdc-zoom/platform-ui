import axios from "axios";

const server: any = axios.create({
  baseURL: "/",
  timeout: 10000
});

server.interceptors.request.use((config: any) => {
  return config;
});

server.interceptors.response.use(
  (resp: any) => {
    if (resp.status !== 200) {
      return Promise.reject(resp.data);
    }
    return resp.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default server;
