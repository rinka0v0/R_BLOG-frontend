import styles from "./index.module.scss";

const Article = (props) => {
  return (
    <article className={styles.container}>
      <figure>figure</figure>
      <div className={styles.article_text_block}>
         <div>{props.title}</div>
         <div>{props.content}</div>
      </div>
    </article>
  );
};

export default Article;
