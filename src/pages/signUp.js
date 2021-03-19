import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import useUser from "../data/useUser";
import Loading from "../components/Loading/index";
import { signup } from "../requests/userApi";
import styles from "../styles/form.module.scss";
import Router from "next/router";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { loggedIn, mutate } = useUser();

  useEffect(() => {
    if (loggedIn) {
      Router.replace("/home");
    }
  }, [loggedIn]);

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      await signup({ name, password });
      mutate();
    }
  };

  if (loggedIn) {
    return <Loading />;
  }

  return (
    <>
      <form method="post" onSubmit={onSignupSubmit} className={styles.form}>
        <h1>SIGN UP</h1>
        <FormInput
          label="password"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <FormInput
          label="name"
          name="name"
          type="text"
          value={name}
          onChange={setName}
        />
        <FormButton value="Sign Up!" />
        <p>Already have an account?</p>
        <Link href="/signIn">
          <a className={styles.link}>Sign In</a>
        </Link>
      </form>
    </>
  );
}
