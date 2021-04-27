import styles from "./index.module.scss";

const Heart = (props) => {
  return <>{props.isLike ? <div className={styles.redHeart}></div> : <div className={styles.grayHeart}></div>}</>;
};

export default Heart;
