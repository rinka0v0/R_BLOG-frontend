import Link from "next/link";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/home">
              <a >Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/home">
              <a >Home</a>
            </Link>
          </li>
          <li >
            <Link href="/home">
              <a>Memo</a>
            </Link>
          </li>
          <li >
            <Link href="/home/post">
              <a>Post</a>
            </Link>
          </li>
          <li >
            <Link href="/post">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
