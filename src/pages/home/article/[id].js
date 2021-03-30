import Header from "../../../components/Header/index";
import dynamic from "next/dynamic";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import Router from "next/router";
import FormButton from "../../../components/FormButton";
import { articleDelete } from "../../../requests/articleApi";
import { EditorState, convertFromRaw } from "draft-js";
import CommentList from "../../../components/CommentList/index";

const Wysiwyg = dynamic(() => import("../../../components/Wysiwyg/index"), {
  ssr: false,
});
const Comment = dynamic(() => import("../../../components/Comment/index"), {
  ssr: false,
});

const Article = ({ blog, comment }) => {
  const { user, loading, loggedIn } = useUser();
  const contentState = convertFromRaw(JSON.parse(blog.body));
  const editorState = EditorState.createWithContent(contentState);

  // コメント一覧
  const comments = comment.results;

  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/signIn");
    }
  }, [loggedIn]);

  const onDeleteClick = () => {
    articleDelete(blog.id);
    Router.replace("/home");
  };

  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <div className={styles.container}>
        <Header />
        {user.user_id === blog.user_id ? (
          <FormButton value="DELETE" onClick={onDeleteClick} />
        ) : (
          <></>
        )}
        <h1>{blog.title}</h1>
        <Wysiwyg readOnly={true} data={editorState} />
        <div className={styles.comment}>
          <h2>Comment</h2>
          {comments === undefined ? (
            <></>
          ) : (
            comments.map((comment, id) => {
              return (
                <CommentList
                  comment={comment.text}
                  user_name={comment.name}
                  created={comment.created}
                  key={id}
                />
              );
            })
          )}
        </div>
        <Comment blog_id={blog.id} />
      </div>
    );
  }
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/auth/blogs");
  const json = await res.json();
  const blogs = json.results;
  const paths = blogs.map((blog) => {
    const stringId = blog.id.toString();
    return { params: { id: stringId } };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  //記事をSSGで取得
  const res = await fetch(`http://localhost:3000/auth/blogs/${id}`);
  const json = await res.json();
  const blog = json.results[0];

  //コメントをSSGで取得
  const commentRes = await fetch(`http://localhost:3000/auth/comment/${id}`);
  const comment = await commentRes.json();

  return { props: { blog, comment }, revalidate: 1 };
};

export default Article;
