import LinkButton from "../components/LinkButton/index";
import styles from "../styles/indexPage.module.scss";
import Image from "next/image";
import useUser from "../data/useUser";
import { useEffect } from "react";
import Router from "next/router";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const IndexPage = () => {
  const { loggedIn, loading, user } = useUser();

  useEffect(() => {
    if (!loading && user) {
      Router.replace("/home");
    }
  }, [loading, user]);

  if (loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.container}>
        <h1>R_BLOG</h1>
        <div className={styles.illustrations}>
          <Image
            src="/undraw_Sharing_articles_re_jnkp.svg"
            alt="Picture of sharing article"
            width={300}
            height={300}
          />
        </div>
        <LinkButton
          value="SIGN UP"
          url="/signUp"
          className={styles.linkButton}
        />
        <LinkButton
          value="SIGN IN"
          url="/signIn"
          className={styles.linkButton}
        />
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;
