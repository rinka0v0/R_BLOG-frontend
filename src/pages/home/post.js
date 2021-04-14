import NavList from "../../components/NavList/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../components/Loading/index";
import styles from "../../styles/form.module.scss";

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

  if (!loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <NavList />
        <div className={styles.post}>
          <Wysiwyg readOnly={false} btnValue="POST" mode="POST" />
        </div>
      </>
    );
  }
};

export default Post;
