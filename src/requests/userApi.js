import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/auth/";

export const signup = async ({ name, password }) => {
  try {
    const res = await axios.post(API_URL + "signup", {
      name: name,
      password: password,
    });
    if (res) {
      console.log("success sign up");
    } else {
      console.log("error!!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ name, password }) => {
  try {
    const res = await axios.post(API_URL + "login", {
      name: name,
      password: password,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// ユーザー情報を取得
export const getUser = async () => {
  try {
    let res = await axios.get(API_URL + "me");
    return res.data;
  } catch (error) {
    console.log(error);
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
