import styles from "../FormInput/index.module.scss";
const FormInput = (props) => {
  return (
    <label className={styles.label}>
      {props.label}
      <input
        className={styles.input}
        name={props.name}
        type={props.type}
        value={props.value}
        maxLength={props.maxLength}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </label>
  );
};

export default FormInput;
