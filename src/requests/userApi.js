import axios from "axios";
import { authHeader } from "./auth_header";

//↓↓ axiosはデフォルトではCookieを使う設定になっていないので、withCredentialsをtrueにすることで通信時にCookieを送信できるようになる
// axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async ({ name, password }) => {
  const res = await axios.post(API_URL + "signup", {
    name: name,
    password: password,
  });
  if (res.data.token) {
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
};

export const signIn = async ({ name, password }) => {
  const res = await axios.post(API_URL + "login", {
    name: name,
    password: password,
  });
  if (res.data.token) {
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
};

// ユーザー情報を取得
export const getUser = async () => {
  try {
    const res = await axios.get(API_URL + "me", {
      headers: authHeader(),
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    // const res = await axios.get(API_URL + "logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
