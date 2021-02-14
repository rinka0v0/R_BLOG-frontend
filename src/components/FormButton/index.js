import styles from "../FormButton/index.module.scss";

const FormButton = (props) => {
  return (
    <input type="submit" value={props.value} className={styles.submit}></input>
  );
};

export default FormButton;
