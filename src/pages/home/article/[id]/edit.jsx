import { EditorState, convertFromRaw } from "draft-js";
import styles from "../../../../styles/article.module.scss";
import dynamic from "next/dynamic";
import Router from "next/router";
import { useEffect } from "react";
import Loading from "../../../../components/Loading";
import useUser from "../../../../data/useUser";
import NavList from "../../../../components/NavList";

const Wysiwyg = dynamic(() => import("../../../../components/Wysiwyg/index"), {
  ssr: false,
});

const EditPage = ({ blog, id }) => {
  const { user, loading, loggedIn } = useUser();

  const contentState = convertFromRaw(JSON.parse(blog.body || "null"));
  const editorState = EditorState.createWithContent(contentState);

  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/signIn");
    }
  }, [loggedIn]);

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
        <Wysiwyg
          readOnly={false}
          data={editorState}
          title={blog.title}
          blog_id={blog.id}
          btnValue="EDIT"
          mode="EDIT"
        />
      </div>
    );
  }
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.WEBAPP_URL}blogs`);
  const json = await res.json();
  const blogs = json.results;
  const paths = blogs.map((blog) => {
    const stringId = blog.id.toString();
    return { params: { id: stringId } };
  });
  return { paths: [...paths], fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  //記事をSSGで取得
  const res = await fetch(`${process.env.WEBAPP_URL}blogs/${id}`);
  const json = await res.json();
  const blog = json.results[0];
  return { props: { blog, id }, revalidate: 1 };
};

export default EditPage;
