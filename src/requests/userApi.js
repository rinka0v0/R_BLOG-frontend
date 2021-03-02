import axios from "axios";

axios.defaults.withCredentialsb = true;
const API_URL = "http://localhost:3000/auth/";

// auth/signup
export const signup = async ({ name, password }) => {
  try {
    const res = await axios.post("http://localhost:3000/auth/signup", {
      name: name,
      password: password,
    });
    if (res.data.message) {
      console.log("この名前は既に使われています。");
    } else if (res) {
      console.log("sign up!");
    } else {
      console.log("error!!");
    }
  } catch (error) {
    console.log(error);
  }
};

// ログイン処理
export const login = async ({ name, password }) => {
  try {
    const res = await axios.post(API_URL + "login", {
      name: name,
      password: password,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

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
    await axios.get(API_URL + "logout");
  } catch (error) {
    console.log(error);
  }
};
