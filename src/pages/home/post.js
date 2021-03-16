import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../components/Loading/index";

const Editor = dynamic(() => import("../../components/Editor/index"), {
  ssr: false,
});

const Post = () => {
  const { user, loading, loggedIn } = useUser();
  const [title, setTitle] = useState("");

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
        <Editor readOnly={false} />
      </>
    );
  }
  return <div className="container"> Login to get info </div>;
};

export default Post;
