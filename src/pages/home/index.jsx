import NavList from "../../components/NavList/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading/index";
import ArticleList from "../../components/ArticleList";
import styles from "../../styles/homePage.module.scss";
import Head from "next/head";
import FormButton from "../../components/FormButton/index";

const fetchBlogs = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}blogs`);
  const blog = await res.json();
  const blogs = blog.results.map((blog, index) => {
    return (
      <ArticleList
        title={blog.title}
        key={index}
        url={`/home/article/${blog.id}`}
        author={blog.name}
        likeNumber={blog.likes_number}
      />
    );
  });
  return blogs;
};

const Home = () => {
  const [count, setCount] = useState(10);
  const [blogs, setBlogs] = useState([]);

  const { user, loading, loggedIn } = useUser();

  const handleShowMorePosts = useCallback(() => {
    setCount((pre) => {
      setCount(pre + 10);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetBlos = async () => {
      const blogs = await fetchBlogs();
      if (isMounted) {
        setBlogs(blogs);
      }
    };
    fetchAndSetBlos();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
  }, [loading]);

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (!loading && loggedIn && user) {
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <NavList />
        {blogs.length ? (
          <div className={styles.container}>
            <h1 className={styles.title}>Latest articles</h1>
            <div className={styles.articleList}>
              {blogs.length ? blogs.slice(0, count) : null}
            </div>
            {blogs.length > count ? (
              <FormButton
                value="MORE"
                onClick={handleShowMorePosts}
              />
            ) : null}
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
};

export default Home;
