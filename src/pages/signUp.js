import Link from "next/link";
import { useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>create account</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <form method="post" onSubmit={FetchData}>
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

const FetchData = async (e) => {
  e.preventDefault();
  console.log("Logined!!");
};
