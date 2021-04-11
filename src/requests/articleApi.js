import axios from "axios";
import authHeader from "./auth_header";

axios.defaults.withCredentials = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//post article
export const postArticle = async ({ title, data }) => {
  try {
    const res = await axios.post(API_URL + "postArticle", {
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
  try {
    const res = await axios.post(API_URL + "postComment", {
      text: comment,
      blog_id: blog_id,
    });
  } catch (error) {
    console.log(error);
  }
};

// コメント一覧を取得
export const getCommentList = async (article_id) => {
  try {
    let res = await axios.get(API_URL + `comment/${article_id}`);
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

// コメントを削除
export const commentDelete = async (comment_id) => {
  try {
    const res = await axios.delete(API_URL + "comment", {
      data: { id: comment_id },
    });
  } catch (error) {
    console.log(error);
  }
};
