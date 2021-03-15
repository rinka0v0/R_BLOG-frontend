import Header from "../../components/Header/index";
import Router from "next/router";
import { useEffect } from "react";
import useUser from "../../data/useUser";
import { logout } from "../../requests/userApi";
import Loading from "../../components/Loading/index";
import FormButton from "../../components/FormButton";

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
    return <Loading />;
  }

  if (loggedIn && user) {
    return (
      <>
        <Header></Header>
        <div>ログアウトしますか？</div>
        <FormButton value="Logout!" onClick={onLogoutSubmit} />
      </>
    );
  }
};

export default Logout;
