import Link from "next/link";
import styles from "./index.module.scss";

const NavList = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/home">
              <a>ホーム</a>
            </Link>
          </li>
          <li>
            <Link href="/home/mypage">
              <a>マイページ</a>
            </Link>
          </li>
          <li>
            <Link href="/home/post">
              <a>投稿する</a>
            </Link>
          </li>
          <li>
            <Link href="/home/signOut">
              <a>サインアウト</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavList;
