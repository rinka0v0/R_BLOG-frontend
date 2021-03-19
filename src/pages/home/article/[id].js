import Header from "../../../components/Header/index";
import dynamic from "next/dynamic";
import styles from "../../../styles/article.module.scss";
import useUser from "../../../data/useUser";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import Router from "next/router";
import FormButton from "../../../components/FormButton";
import { articleDelete } from "../../../requests/articleApi";

const Editor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

const Article = ({ blog }) => {
  const { user, loading, loggedIn } = useUser();
  const jsonData = JSON.parse(blog.body);

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
        <div className={styles.wrap}>
          <Editor readOnly={true} data={jsonData} />
        </div>
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
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`http://localhost:3000/auth/blogs/${id}`);
  const json = await res.json();
  const blog = json.results[0];
  return { props: { blog } };
};

export default Article;
