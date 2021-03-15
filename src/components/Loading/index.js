import styles from "../Loading/index.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.loading}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
