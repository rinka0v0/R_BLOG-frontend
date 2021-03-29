import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//post article
export const post = async ({ title, data }) => {
  try {
    const res = await axios.post(API_URL + "post", {
      title: title,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const articleDelete = async (id) => {
  try {
    const res = await axios.get(API_URL + `delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async ({ comment, blog_id }) => {
  console.log(comment);
  console.log(blog_id);
  try {
    const res = await axios.post(API_URL + "postComment", {
      text: comment,
      blog_id: blog_id,
    });
  } catch (error) {
    console.log(error);
  }
};
