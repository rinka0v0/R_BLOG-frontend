import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import useUser from "../data/useUser";
import { useRouter } from "next/router";
import { signup } from "../requests/userApi";

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
    return <>Redirecting... </>;
  }

  return (
    <>
      <h1>create account</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <form method="post" onSubmit={onSignupSubmit}>
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
      </form>
    </>
  );
}
