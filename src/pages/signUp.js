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

  const onSignupSubmit = (e) => {
    e.preventDefault();
    if (name && password) {
      signup({ name, password });
      mutate();
    }
  };

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
