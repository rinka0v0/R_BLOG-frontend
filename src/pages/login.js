import Link from "next/link";
import { useEffect, useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";
import { useRouter } from "next/router";
import useUser from "../data/useUser";
import { login } from "../requests/userApi";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, loggedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (loggedIn) {
      router.push("/home");
    }
  }, [loggedIn]);

  if (loggedIn) {
    return <>Redirecting... </>;
  }

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (name && password) {
      login({ name, password });
      mutate();
    }
  };

  return (
    <>
      <Link href="/signUp">
        <a>Sign Up</a>
      </Link>

      <button onClick={logout}>logout</button>

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
