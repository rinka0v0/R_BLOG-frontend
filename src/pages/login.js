import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import Router from "next/router";
import useUser from "../data/useUser";
import { login } from "../requests/userApi";
import Loading from "../components/Loading/index";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, mutate } = useUser();

  useEffect(() => {
    if (loggedIn) {
      Router.replace("/home");
    }
  }, [loggedIn]);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    if (name && password) {
      await login({ name, password });
      mutate();
    }
  };
  if (loggedIn) {
    return <Loading />;
  }
  return (
    <>
      <Link href="/signUp">
        <a>Sign Up</a>
      </Link>

      <h1>Login </h1>
      <form method="post" onSubmit={onLoginSubmit}>
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
        <FormButton value="Login" />
      </form>
    </>
  );
}
