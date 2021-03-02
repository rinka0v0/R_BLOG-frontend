import styles from "../FormButton/index.module.scss";

const FormButton = (props) => {
  return (
    <input type="submit" value={props.value} className={styles.submit} onClick={props.onClick}></input>
  );
};

export default FormButton;
