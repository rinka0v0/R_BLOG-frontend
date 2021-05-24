import NavList from "../../components/NavList/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading/index";
import ArticleList from "../../components/ArticleList";
import styles from "../../styles/homePage.module.scss";
import Head from "next/head";
import FormButton from "../../components/FormButton/index";
import Footer from "../../components/Footer";
import { getFollowBlogs, mostLikeBlogs } from "../../requests/articleApi";

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
  const [fallowCount, setFallowCount] = useState(10);
  const [blogs, setBlogs] = useState([]);
  const [likeBlogs, setLikeBlogs] = useState([]);
  const [followBlogs, setFollowBlogs] = useState([]);
  const { user, loading, loggedIn } = useUser();

  const [fetching, setFetching] = useState(true);

  const handleShowMorePosts = useCallback(() => {
    setCount((pre) => {
      setCount(pre + 10);
    });
  }, []);
  const handleShowMoreFollowPosts = useCallback(() => {
    setCount((pre) => {
      setFallowCount(pre + 10);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetBlos = async () => {
      const blogs = await fetchBlogs();
      const likeBlogs = await mostLikeBlogs();
      const followBlogs = await getFollowBlogs();
      if (isMounted) {
        setBlogs(blogs);
        setFollowBlogs(followBlogs);
        setLikeBlogs(likeBlogs);
        setFetching(false);
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

  if (fetching) {
    return <Loading />;
  }

  if (!loading && loggedIn && user) {
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <NavList />
        <div className={styles.container}>
          {followBlogs.length ? (
            <div>
              <h1 className={styles.title}>フォロー中の人の投稿</h1>
              <div className={styles.articleList}>
                {followBlogs.slice(0, count)}
              </div>
              {blogs.length > fallowCount ? (
                <FormButton value="MORE" onClick={handleShowMoreFollowPosts} />
              ) : null}
            </div>
          ) : null}

          {likeBlogs.length ? (
            <div>
              <h1 className={styles.title}>最もいいねがついた投稿</h1>
              <div className={styles.articleList}>
                {likeBlogs.slice(0, count)}
              </div>
            </div>
          ) : null}

          {blogs.length ? (
            <div>
              <h1 className={styles.title}>最近の投稿</h1>
              <div className={styles.articleList}>{blogs.slice(0, count)}</div>
              {blogs.length > count ? (
                <FormButton value="MORE" onClick={handleShowMorePosts} />
              ) : null}
              <Footer />
            </div>
          ) : null}
        </div>
      </>
    );
  }
};

export default Home;
