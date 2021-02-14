import Link from "next/link";
import { useState } from "react";
import FormButton from "../components/FormButton/index";
import FormInput from "../components/FormInput/index";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Link href="/signUp">
        <a>Sign Up</a>
      </Link>

      <h1>Login </h1>
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
        <FormButton value="Login" />
      </form>
    </>
  );
}

const FetchData = async (e) => {
  e.preventDefault();
  console.log("Logined!!");
};
