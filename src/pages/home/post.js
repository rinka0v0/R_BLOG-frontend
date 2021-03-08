import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor/index"), {
  ssr: false,
});

const Post = () => {
  const { user, loading, loggedIn } = useUser();
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
        <Editor />
      </>
    );
  }
};

export default Post;
