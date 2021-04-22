import NavList from "../../../components/NavList/index";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import useCommentListGet from "../../../data/useCommentListGet";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Router, { useRouter } from "next/router";
import FormButton from "../../../components/FormButton";
import { articleDelete } from "../../../requests/articleApi";
import { EditorState, convertFromRaw } from "draft-js";
import { memo } from "react";

import dynamic from "next/dynamic";
const Wysiwyg = dynamic(() => import("../../../components/Wysiwyg/index"), {
  ssr: false,
});
const Comment = dynamic(() => import("../../../components/Comment/index"), {
  ssr: false,
});

const fetchBlog = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blogs/${id}`);
    const json = await res.json();
    const blog = json.results[0];
    const contentState = convertFromRaw(JSON.parse(blog.body));
    const editorState = EditorState.createWithContent(contentState);
    return {
      blog: blog,
      editorState: editorState,
    };
  } catch (err) {
    console.log(err);
  }
};

const Article = memo(() => {
  const router = useRouter();

  const [blogId, setBlogId] = useState();
  const [blog, setBlog] = useState({});
  const [editorState, setEditorState] = useState();
  const [count, setCount] = useState(5);

  // useSWRで認証情報・コメントを取得
  const { user, loading, loggedIn } = useUser();
  const { error, comments, commentMutate } = useCommentListGet(
    blogId,
    user.user_id
  );

  useEffect(() => {
    if (router.asPath !== router.route) {
      setBlogId(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    if (blogId) {
      const fetchAndSetBlog = async () => {
        const { blog, editorState } = await fetchBlog(blogId);
        setBlog(blog);
        setEditorState(editorState);
      };
      fetchAndSetBlog();
      commentMutate();
    }
  }, [blogId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user !== undefined && !loggedIn) {
        Router.replace("/signIn");
      }
    };
    fetchUser();
  }, [loggedIn]);

  const handleShowMorePosts = () => {
    setCount((pre) => {
      setCount(pre + 5);
    });
  };

  const onDeleteClick = () => {
    if (confirm("記事を削除しますか？")) {
      try {
        articleDelete(blog.id);
        Router.replace("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onEditClick = () => {
    Router.replace(`/home/article/${blogId}/edit`);
  };

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <NavList />
        {!blog.title ? (
          <Loading />
        ) : (
          <>
            <div className={styles.container}>
              {user.user_id === blog.user_id ? (
                <>
                  <FormButton value="DELETE" onClick={onDeleteClick} />
                  <FormButton value="EDIT" onClick={onEditClick} />
                </>
              ) : null}
              <h1>{blog.title}</h1>
              <p className={styles.autherName}>{blog.name}</p>
              <p className={styles.createdDate}>{blog.created_at}</p>
              <Wysiwyg readOnly={true} data={editorState} mode="READ" />
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
          </>
        )}
      </>
    );
  }
});

export default Article;
