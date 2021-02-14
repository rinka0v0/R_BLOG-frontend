import Link from "next/link";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="">
              <a >Blog</a>
            </Link>
          </li>
          <li >
            <Link href="">
              <a>Memo</a>
            </Link>
          </li>
          <li >
            <Link href="">
              <a>Post</a>
            </Link>
          </li>
          <li >
            <Link href="">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
