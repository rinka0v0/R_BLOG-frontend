import Link from "next/link";
import styles from "../LinkButton/index.module.scss";

const LinkButton = (props) => {
  return (
    <div className='linkButton'>
      <Link href={props.url}>
        <p className={styles.linkBtn}>{props.value}</p>
      </Link>
    </div>
  );
};

export default LinkButton;
