import { EditorState, convertFromRaw } from "draft-js";
import styles from "../../../../styles/article.module.scss";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import useUser from "../../../../data/useUser";
import NavList from "../../../../components/NavList";

const Wysiwyg = dynamic(() => import("../../../../components/Wysiwyg/index"), {
  ssr: false,
});

const fetchBlog = async (blogId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blogs/${blogId}`);
  const json = await res.json();
  const blog = json.results[0];
  const contentState = convertFromRaw(JSON.parse(blog.body || "null"));
  const editorState = EditorState.createWithContent(contentState);
  console.log(editorState);
  return {
    blog: blog,
    editorState: editorState,
  };
};

const EditPage = () => {
  const { user, loading, loggedIn } = useUser();

  const router = useRouter();
  const [blogId, setBlogId] = useState();
  const [blog, setBlog] = useState({});
  const [editorState, setEditorState] = useState();

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

  if (!loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <NavList />
        {!blog.title ? (
          <Loading />
        ) : (
          <div className={styles.container}>
            <Wysiwyg
              readOnly={false}
              data={editorState}
              title={blog.title}
              blog_id={blog.id}
              mode="EDIT"
            />
          </div>
        )}
      </>
    );
  }
};

export default EditPage;
