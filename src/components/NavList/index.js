import Link from "next/link";
import styles from "./index.module.scss";

const NavList = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/home">
              <a>HOME</a>
            </Link>
          </li>
          <li>
            <Link href="/home/mypage">
              <a>MYPAGE</a>
            </Link>
          </li>
          <li>
            <Link href="/home/post">
              <a>POST</a>
            </Link>
          </li>
          <li>
            <Link href="/home/signOut">
              <a>SIGN OUT</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavList;
