import NavList from "../../../components/NavList/index";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import useCommentListGet from "../../../data/useCommentListGet";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Router, { useRouter } from "next/router";
import FormButton from "../../../components/FormButton";
import {
  articleDelete,
  deleteLike,
  postLike,
  verificationLike,
} from "../../../requests/articleApi";
import dynamic from "next/dynamic";
import Heart from "../../../components/Heart";
const Wysiwyg = dynamic(() => import("../../../components/Wysiwyg/index"), {
  ssr: false,
});
const Comment = dynamic(() => import("../../../components/Comment/index"), {
  ssr: false,
});
import { fetchBlog } from "../../../requests/articleApi";
import Link from "next/link";

const Article = () => {
  const router = useRouter();

  const [blogId, setBlogId] = useState();
  const [blog, setBlog] = useState({});
  const [editorState, setEditorState] = useState();
  const [count, setCount] = useState(5);
  const [like, setLike] = useState(false);

  // useSWRで認証情報・コメントを取得
  const { user, loading, loggedIn } = useUser();
  const { comments, commentMutate } = useCommentListGet(blogId, user);
  const CommentList = comments !== undefined ? comments.slice(0, count) : null;

  useEffect(() => {
    if (router.asPath !== router.route) {
      setBlogId(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    if (blogId) {
      const fetchAndSetBlog = async () => {
        const { blog, editorState } = await fetchBlog(blogId);
        const isLike = await verificationLike(blogId);
        if (isLike) {
          setLike(true);
        }
        setBlog(blog);
        setEditorState(editorState);
      };
      fetchAndSetBlog();
      commentMutate();
    }
  }, [blogId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading && !user) {
        Router.replace("/signIn");
      }
    };
    fetchUser();
    commentMutate();
  }, []);

  const handleShowMorePosts = useCallback(() => {
    setCount((pre) => {
      setCount(pre + 5);
    });
  }, []);

  const onDeleteClick = useCallback(async () => {
    if (confirm("記事を削除しますか？")) {
      try {
        await articleDelete(blog.id);
        Router.replace("/home");
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const onEditClick = useCallback(() => {
    Router.replace(`/home/article/${blogId}/edit`);
  }, [blogId]);

  const clickHeart = useCallback(() => {
    if (like) {
      deleteLike(blog.id);
      setLike(!like);
    } else {
      postLike(blog.id);
      setLike(!like);
    }
  }, [blog]);

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <NavList />
        {blog === {} ? <Loading /> : null}
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
              <Link href={"/home/user/" + blog.user_id}>
                <p className={styles.autherName}>by {blog.name}</p>
              </Link>
              <h1>{blog.title}</h1>
              <p className={styles.createdDate}>{blog.created_at}</p>
              <Wysiwyg readOnly={true} data={editorState} mode="READ" />
              <div className={styles.like}>
                <span onClick={clickHeart}>
                  <Heart isLike={like} />
                </span>
              </div>
              <div className={styles.comment}>
                <h2>Comment</h2>
                {/* {CommentList} */}
                {comments !== undefined ? comments.slice(0, count) : null}
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
};

export default Article;
