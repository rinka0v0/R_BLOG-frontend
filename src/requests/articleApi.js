import axios from "axios";
import { authHeader } from "./auth_header";
import { EditorState, convertFromRaw } from "draft-js";
import ArticleList from "../components/ArticleList";

axios.defaults.withCredentials = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//post article
export const postArticle = async ({ title, data }) => {
  try {
    const res = await axios.post(
      API_URL + "postArticle",
      {
        title: title,
        data: data,
      },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    // console.log(error);
  }
};

export const editArticle = async ({ title, data, blog_id }) => {
  const res = await axios.put(
    API_URL + "article",
    {
      title: title,
      data: data,
      blog_id: blog_id,
    },
    {
      headers: authHeader(),
    }
  );
};

export const articleDelete = async (id) => {
  const res = await axios.get(API_URL + `delete/${id}`, {
    headers: authHeader(),
  });
};

export const postComment = async ({ comment, blog_id }) => {
  try {
    const res = await axios.post(
      API_URL + "postComment",
      {
        text: comment,
        blog_id: blog_id,
      },
      { headers: authHeader() }
    );
  } catch (error) {
    // console.log(error);
  }
};

export const postLike = async (blog_id) => {
  try {
    let res = await axios.post(
      API_URL + "like",
      { blog_id: blog_id },
      { headers: authHeader() }
    );
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLike = async (blog_id) => {
  try {
    const res = await axios.delete(API_URL + "like", {
      data: { blog_id },
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const verificationLike = async (blog_id) => {
  try {
    const res = await axios.get(`${API_URL}like/${blog_id}`, {
      headers: authHeader(),
    });
    return res.data.result[0].likes_number;
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
    // console.log(error);
  }
};

// コメントを削除
export const commentDelete = async (comment_id) => {
  try {
    const res = await axios.delete(API_URL + "comment", {
      data: { id: comment_id },
      headers: authHeader(),
    });
  } catch (error) {
    // console.log(error);
  }
};

export const fetchBlog = async (id) => {
  try {
    const jsonBlog = await axios.get(`${API_URL}blogs/${id}`, {
      headers: authHeader(),
    });
    const blog = jsonBlog.data.results[0];
    const contentState = convertFromRaw(JSON.parse(blog.body));
    const editorState = EditorState.createWithContent(contentState);
    return {
      blog: blog,
      editorState: editorState,
    };
  } catch (err) {
    console.log(err);
    return {
      blog: [],
    };
  }
};

// フォロー中の人の記事を取得
export const getFollowBlogs = async () => {
  try {
    const jsonBlog = await axios.get(`${API_URL}blogs/follow`, {
      headers: authHeader(),
    });
    const blog = jsonBlog.data.results;
    const blogs = blog.map((blog, index) => {
      return (
        <ArticleList
          title={blog.title}
          key={index}
          url={`/home/article/${blog.id}`}
          author={blog.name}
          likeNumber={blog.likes_number}
        />
      );
    });
    return blogs;
  } catch (err) {
    console.log(err);
    return {
      blog: [],
    };
  }
};
// いいねが多い記事の取得
export const mostLikeBlogs = async () => {
  try {
    const jsonBlog = await axios.get(`${API_URL}blogs/like`, {
      headers: authHeader(),
    });
    const blog = jsonBlog.data.results;
    const blogs = blog.map((blog, index) => {
      return (
        <ArticleList
          title={blog.title}
          key={index}
          url={`/home/article/${blog.id}`}
          author={blog.name}
          likeNumber={blog.likes_number}
        />
      );
    });
    return blogs;
  } catch (err) {
    console.log(err);
    return {
      blog: [],
    };
  }
};

export const getUserBlog = async (userId) => {
  try {
    const jsonBlog = await axios.get(`${API_URL}blogs/user/${userId}`, {
      headers: authHeader(),
    });
    const blogs = jsonBlog.data.results;
    return blogs;
  } catch (error) {
    console.log(error);
    return {};
  }
};
