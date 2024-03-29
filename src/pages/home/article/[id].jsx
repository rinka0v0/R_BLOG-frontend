import NavList from "../../../components/NavList/index";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import useCommentListGet from "../../../data/useCommentListGet";
import { useCallback, useEffect, useRef, useState } from "react";
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
import Footer from "../../../components/Footer";

const Article = () => {
  const router = useRouter();

  const [blogId, setBlogId] = useState();
  const [blog, setBlog] = useState({});
  const [editorState, setEditorState] = useState();
  const [count, setCount] = useState(5);
  const [like, setLike] = useState(false);
  const [fetching, setFetching] = useState(true);

  const processing = useRef(false);

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
        setFetching(false);
      };
      fetchAndSetBlog();
      commentMutate();
    }
  }, [blogId]);

  useEffect(() => {
    // const fetchUser = async () => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
    // };
    // fetchUser();
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
  }, [blog]);

  const onEditClick = useCallback(() => {
    Router.replace(`/home/article/${blogId}/edit`);
  }, [blogId]);

  const clickHeart = useCallback(async () => {
    if (processing.current) return;
    processing.current = true;

    if (like) {
      await deleteLike(blog.id);
      setLike((prev) => !prev);
    } else {
      await postLike(blog.id);
      setLike((prev) => !prev);
    }
    processing.current = false;
  }, [blog]);

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (fetching) {
    return <Loading />;
  }
  console.log(blog);

  if (loggedIn && user) {
    return (
      <>
        <NavList />
        {!fetching && !blog.id ? (
          <>
            <p className={styles.error}>記事がありません </p>
            <Footer />
          </>
        ) : (
          <>
            <div className={styles.container}>
              {user.user_id === blog.user_id ? (
                <>
                  <FormButton value="削除" onClick={onDeleteClick} />
                  <FormButton value="編集" onClick={onEditClick} />
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
                {comments !== undefined ? (
                  comments.slice(0, count)
                ) : (
                  <div className={styles.noComment}>コメントはありません</div>
                )}
              </div>
              {comments !== undefined && comments.length > count ? (
                <FormButton
                  value="MORE"
                  onClick={handleShowMorePosts}
                  className={styles.moreBtn}
                />
              ) : null}
              <Comment blog_id={blog.id} mutate={commentMutate} />
              <Footer />
            </div>
          </>
        )}
      </>
    );
  }
};

export default Article;
