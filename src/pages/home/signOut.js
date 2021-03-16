import Header from "../../components/Header/index";
import Router from "next/router";
import { useEffect } from "react";
import useUser from "../../data/useUser";
import { logout } from "../../requests/userApi";
import Loading from "../../components/Loading/index";
import FormButton from "../../components/FormButton";
import styles from "../../styles/form.module.scss"

const Logout = () => {
  const { user, loggedIn, mutate } = useUser();

  useEffect(() => {
    if (!loggedIn) {
      Router.replace("/signIn");
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
        <form className={styles.signOut}>
        <h1>Do you want to sign out?</h1>
        <FormButton value="SIGN OUT!" onClick={onLogoutSubmit} className={styles.button}/>
        </form>
      </>
    );
  }
};

export default Logout;
