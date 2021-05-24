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
import Footer from "../components/Footer";

const SignIn = memo(() => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { user, loggedIn, mutate, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
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
        ゲストサインイン
      </div>
      <form method="post" onSubmit={onLoginSubmit} className={styles.signIn}>
        <h1>サインイン</h1>
        <FormInput
          label="名前"
          name="name"
          type="text"
          value={name}
          onChange={setName}
        />
        <FormInput
          label="パスワード"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <FormButton value="サインイン" />
        {err === "length" ? (
          <div className={styles.error}>
            名前とパスワードを入力してください
          </div>
        ) : null}
        {err === "notFound" ? (
          <div className={styles.error}>not found accont</div>
        ) : null}
        <div>
          <p>アカウントをお持ちでないですか?</p>
          <Link href="/signUp">
            <a className={styles.link}>サインアップ</a>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
});

export default SignIn;
