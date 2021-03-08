import Header from "../../components/Header/index";
import Article from "../../components/Article/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { user,loading ,loggedIn } = useUser();
  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/login");
    }
  }, [loggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loggedIn && user) {
    return (
      <>
        <Header />
        <Article title="title" content="Hello!!" />
      </>
    );
  }
  return <div className="container"> Login to get info </div>;
};

export default Home;
