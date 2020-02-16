import { request } from "@/utils";

export function login(username = "super", password = "123456") {
  return request({
    url: `/security/login?username=${username}&password=${password}`,
    method: "get"
  });
}
