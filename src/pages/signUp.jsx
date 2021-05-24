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
        ゲストサインイン
      </div>
      <form method="post" onSubmit={onSignupSubmit} className={styles.signUp}>
        <h1>サインアップ</h1>
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
        <FormButton value="サインアップ" />
        {err === "length" ? (
          <div className={styles.error}>
            名前とパスワードを入力してください
          </div>
        ) : null}
        {err === "alredyExist" ? (
          <div className={styles.error}>この名前は使われています</div>
        ) : null}
        <div>
          <p>既にアカウントをお持ちですか?</p>
          <Link href="/signIn">
            <a className={styles.link}>サインイン</a>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
});

export default SignUp;
