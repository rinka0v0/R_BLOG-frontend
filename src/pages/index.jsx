import LinkButton from "../components/LinkButton/index";
import styles from "../styles/IndexPage.module.scss";
import Image from "next/image";

const IndexPage = () => {
  return (
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
      <LinkButton value="SIGN UP" url="/signUp" className={styles.linkButton} />
      <LinkButton value="SIGN IN" url="/signIn" className={styles.linkButton} />
    </div>
  );
};

export default IndexPage;
