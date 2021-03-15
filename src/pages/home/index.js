import Header from "../../components/Header/index";
import Article from "../../components/Article/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect } from "react";
import Loading from "../../components/Loading/index";

const Home = ({ blog }) => {
  const { user, loading, loggedIn } = useUser();
  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/login");
    }
  }, [loggedIn]);
  
  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <Header />
        <Article title="title" content="Hello!!" />
        {blog.map((article, id) => {
          return <Article title={article.title} key={id} />;
        })}
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
