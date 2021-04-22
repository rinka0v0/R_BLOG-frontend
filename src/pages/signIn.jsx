import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import Router from "next/router";
import useUser from "../data/useUser";
import { signIn } from "../requests/userApi";
import Loading from "../components/Loading/index";
import styles from "../styles/form.module.scss";
import { memo } from "react";

const SignIn = memo(() => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { loggedIn, mutate, loading } = useUser();

  useEffect(() => {
    if (loggedIn) {
      Router.replace("/home");
    }
  }, [loggedIn]);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      try {
        await signIn({ name, password });
        mutate();
      } catch (error) {
        setErr("notFound");
      }
    } else {
      setErr("length");
    }
  };
  if (loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <form method="post" onSubmit={onLoginSubmit} className={styles.signIn}>
        <h1>SIGN IN</h1>
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
        <FormButton value="Sign in" />
        {err === "length" ? (
          <div className={styles.error}>
            Please input user name and password
          </div>
        ) : null}
        {err === "notFound" ? (
          <div className={styles.error}>not found accont</div>
        ) : null}
        <div>
          <p>Don't have an account?</p>
          <Link href="/signUp">
            <a className={styles.link}>Sign Up</a>
          </Link>
        </div>
      </form>
    </>
  );
});

export default SignIn;