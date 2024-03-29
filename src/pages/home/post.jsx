import NavList from "../../components/NavList/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../components/Loading/index";
import styles from "../../styles/form.module.scss";
import Footer from "../../components/Footer";

const Wysiwyg = dynamic(() => import("../../components/Wysiwyg/index"), {
  ssr: false,
});

const Post = () => {
  const { user, loading, loggedIn, mutate } = useUser();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
  }, [loading, user]);

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
          <Wysiwyg readOnly={false} readOnly={false} mode="POST" title="" />
          <Footer />
        </div>
      </>
    );
  }
};

export default Post;
