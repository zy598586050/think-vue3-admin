import request from "@/utils/request";

export const login = (data: { username: string; password: string }) => {
  return request({
    url: "login",
    method: "POST",
    data: {
      account: data.username,
      password: data.password,
    },
  });
};
