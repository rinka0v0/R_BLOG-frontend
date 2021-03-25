import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../components/Loading/index";
import DraftEditor from "../../components/DraftEditor/index";

const Wysiwyg = dynamic(() => import("../../components/Wysiwyg/index"), {
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
        <DraftEditor readOnly={false} />
        <Wysiwyg readOnly={false} />
      </>
    );
  }
};

export default Post;
