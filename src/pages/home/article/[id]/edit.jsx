import styles from "../../../../styles/article.module.scss";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import useUser from "../../../../data/useUser";
import NavList from "../../../../components/NavList";
import { fetchBlog } from "../../../../requests/articleApi";
import Footer from "../../../../components/Footer";

const Wysiwyg = dynamic(() => import("../../../../components/Wysiwyg/index"), {
  ssr: false,
});

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
            <Footer />
          </div>
        )}
      </>
    );
  }
};

export default EditPage;
