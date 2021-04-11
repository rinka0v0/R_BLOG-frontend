import NavList from "../../../components/NavList/index";
import dynamic from "next/dynamic";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import useCommentListGet from "../../../data/useCommentListGet";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Router from "next/router";
import FormButton from "../../../components/FormButton";
import { articleDelete } from "../../../requests/articleApi";
import { EditorState, convertFromRaw } from "draft-js";

const Wysiwyg = dynamic(() => import("../../../components/Wysiwyg/index"), {
  ssr: false,
});
const Comment = dynamic(() => import("../../../components/Comment/index"), {
  ssr: false,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Article = ({ blog, id }) => {
  const { user, loading, loggedIn } = useUser();
  const { error, comments, commentMutate } = useCommentListGet(
    id,
    user.user_id
  );

  const contentState = convertFromRaw(JSON.parse(blog.body));
  const editorState = EditorState.createWithContent(contentState);

  const [count, setCount] = useState(5);

  const handleShowMorePosts = () => {
    setCount((pre) => {
      setCount(pre + 5);
    });
  };

  useEffect(() => {
    commentMutate();
    if (!loggedIn) {
      Router.replace("/signIn");
    }
  }, [loggedIn]);

  const onDeleteClick = () => {
    articleDelete(blog.id);
    Router.replace("/home");
  };

  if (!loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <div className={styles.container}>
        <NavList />
        {user.user_id === blog.user_id ? (
          <FormButton value="DELETE" onClick={onDeleteClick} />
        ) : (
          <></>
        )}
        <h1>{blog.title}</h1>
        <Wysiwyg readOnly={true} data={editorState} />
        <div className={styles.comment}>
          <h2>Comment</h2>
          {comments !== undefined ? comments.slice(0, count) : <></>}
        </div>
        {comments !== undefined && comments.length > count ? (
          <FormButton
            value="MORE"
            onClick={handleShowMorePosts}
            className={styles.moreBtn}
          />
        ) : null}
        <Comment blog_id={blog.id} mutate={commentMutate} />
      </div>
    );
  }
};

export const getStaticPaths = async () => {
  // const res = await fetch(API_URL + "blogs");
  const res = await fetch(`${process.env.WEBAPP_URL}blogs`);
  const json = await res.json();
  const blogs = json.results;
  const paths = blogs.map((blog) => {
    const stringId = blog.id.toString();
    return { params: { id: stringId } };
  });
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  //記事をSSGで取得
  // const res = await fetch(API_URL + `blogs/${id}`);
  const res = await fetch(`${process.env.WEBAPP_URL}blogs/${id}`);
  const json = await res.json();
  const blog = json.results[0];
  return { props: { blog, id }, revalidate: 1 };
};

export default Article;
