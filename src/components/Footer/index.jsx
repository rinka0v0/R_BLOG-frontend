import Link from "next/link";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <span>&copy; since 2021 rinka All rights reserved</span>
      <Link href="/terms">
        <a>利用規約</a>
      </Link>
    </footer>
  );
};

export default Footer;
