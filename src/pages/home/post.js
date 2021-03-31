import Header from "../../components/Header/index";
import useUser from "../../data/useUser";
import Router from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../../components/Loading/index";
import styles from "../../styles/form.module.scss"

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
    return <Loading />
  }
  if (loading) {
    return <Loading />;
  }
  if (loggedIn && user) {
    return (
      <>
        <Header />
        <div className={styles.post}>
          <Wysiwyg readOnly={false} />
        </div>
      </>
    );
  }
};

export default Post;
