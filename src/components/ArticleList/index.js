import Link from "next/link";
import styles from "./index.module.scss";

const ArticleList = (props) => {
  return (
    <Link href={props.url}>
      <div className={styles.container}>
        <h1 className={styles.title}>{props.title}</h1>
        <div>
          <div className={styles.heart}></div>
          <div className={styles.like_number}>{props.likeNumber}</div>
        </div>
        <p>by {props.author}</p>
        <div className={styles.go_corner}>
          <div className={styles.go_arrow}>→</div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleList;
