import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/index";
import ArticleList from "../../components/ArticleList";
import styles from "../../styles/homePage.module.scss";
import Head from "next/head";
import FormButton from "../../components/FormButton/index";

const Home = ({ blog }) => {
  const [count, setCount] = useState(2);
  const blogs = blog.map((blog, index) => {
    return (
      <ArticleList
        title={blog.title}
        key={index}
        url={`/home/article/${blog.id}`}
        author={blog.name}
      />
    );
  });

  const handleShowMorePosts = () => {
    setCount((pre) => {
      setCount(pre + 2);
    });
  };

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
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Header />
        <h1 className={styles.title}>Latest articles</h1>
        <div className={styles.articleList}>
          {/* {blog.map((article, id) => {
            return (
              <ArticleList
                title={article.title}
                key={id}
                url={`/home/article/${article.id}`}
                author={article.name}
              />
            );
          })} */}
          <ul>{blogs.slice(0, count)}</ul>
          {blog.length > count ? (
            <FormButton value="MORE" onClick={handleShowMorePosts} />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
};

export const getStaticProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(API_URL + "blogs");
  const blog = await res.json();
  return {
    props: {
      blog: blog.results,
      revalidate: 1,
    },
  };
};

export default Home;
