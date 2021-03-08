import Header from "../../components/Header/index";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../data/useUser";
import { logout } from "../../requests/userApi";

const Logout = () => {
  const { user, loggedIn, mutate } = useUser();

  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/login");
    }
  }, [loggedIn]);

  const onLogoutSubmit = async () => {
    await logout();
    mutate();
  };

  if (!loggedIn) {
    return <div>Redirecting...</div>;
  }

  if (loggedIn && user) {
    return (
      <>
        <Header></Header>
        <div>ログアウトしますか？</div>
        <button onClick={onLogoutSubmit}>logout</button>
      </>
    );
  }
};

export default Logout;
