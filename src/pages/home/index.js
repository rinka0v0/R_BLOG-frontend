import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect } from "react";
import Loading from "../../components/Loading/index";
import ArticleList from "../../components/ArticleList";
import styles from "../../styles/homePage.module.scss";

const Home = ({ blog }) => {
  const { user, loading, loggedIn } = useUser();
  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/signIn");
    }
  }, [loggedIn]);

  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <Header />
        <div className={styles.articleList}>
          {blog.map((article, id) => {
            return (
              <ArticleList
                title={article.title}
                key={id}
                url={`/home/article/${article.id}`}
                author={article.name}
              />
            );
          })}
        </div>
      </>
    );
  }
  return <div className="container"> Login to get info </div>;
};

export const getStaticProps = async () => {
  const API_URL = "http://localhost:3000/auth/";
  const res = await fetch(API_URL + "blogs");
  const blog = await res.json();
  return {
    props: {
      blog: blog.results,
    },
  };
};

export default Home;
