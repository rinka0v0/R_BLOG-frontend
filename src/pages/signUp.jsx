import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import useUser from "../data/useUser";
import Loading from "../components/Loading/index";
import { signIn, signup } from "../requests/userApi";
import styles from "../styles/form.module.scss";
import Router from "next/router";
import { memo } from "react";
import Footer from "../components/Footer";

const SignUp = memo(() => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { user, loggedIn, mutate, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      Router.replace("/home");
    }
  }, [loggedIn]);

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      try {
        await signup({ name, password });
        mutate();
      } catch (error) {
        setErr("alredyExist");
      }
    } else {
      setErr("length");
    }
  };

  const guestSignIn = async () => {
    try {
      await signIn({ name: "guestUser", password: "guestUser" });
      mutate();
    } catch (error) {
      setErr("notFound");
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
      <div className={styles.guestsignin} onClick={guestSignIn}>
        Guest sign in
      </div>
      <form method="post" onSubmit={onSignupSubmit} className={styles.signUp}>
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
        <FormButton value="Sign Up" />
        {err === "length" ? (
          <div className={styles.error}>
            Please input user name and password
          </div>
        ) : null}
        {err === "alredyExist" ? (
          <div className={styles.error}>The name is already in use.</div>
        ) : null}
        <div>
          <p>Already have an account?</p>
          <Link href="/signIn">
            <a className={styles.link}>Sign In</a>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
});

export default SignUp;
