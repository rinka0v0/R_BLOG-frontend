import styles from "./index.module.scss";
import { memo } from "react";

export const Profile = memo((props) => {
  const { user = {} } = props;
  return (
    <div>
      <div className={styles.name}>{user.name}</div>
      <p className={styles.profile}>
        自己紹介
      </p>
      <div className={styles.follower_like_erea}>
        <div>followe: {user.follow_number}</div>
        <div>follower: {user.follower_number}</div>
      </div>
    </div>
  );
});
