import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async ({ name, password }) => {
  const res = await axios.post(API_URL + "signup", {
    name: name,
    password: password,
  });
};

export const signIn = async ({ name, password }) => {
  const res = await axios.post(API_URL + "login", {
    name: name,
    password: password,
  });
};

// ユーザー情報を取得
export const getUser = async () => {
  try {
    let res = await axios.get(API_URL + "me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(API_URL + "logout");
  } catch (error) {
    console.log(error);
  }
};
