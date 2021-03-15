import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000/auth/";

//post article
export const post = async ({ title, data }) => {
  try {
    console.log(data);
    const stringigyData = JSON.stringify(data);
    const res = await axios.post(API_URL + "post", {
      title: title,
      data: stringigyData,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
