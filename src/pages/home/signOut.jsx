import NavList from "../../components/NavList/index";
import Router from "next/router";
import { useEffect } from "react";
import useUser from "../../data/useUser";
import { logout } from "../../requests/userApi";
import Loading from "../../components/Loading/index";
import FormButton from "../../components/FormButton";
import styles from "../../styles/form.module.scss";
import Footer from "../../components/Footer";

const Logout = () => {
  const { user, loggedIn, mutate, loading } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading && !user) {
        Router.replace("/signIn");
      }
    };
    fetchUser();
  }, [loading]);

  const onLogoutSubmit = async () => {
    await logout();
    mutate();
  };

  if (!loggedIn) {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }

  if (loggedIn && user) {
    return (
      <>
        <NavList />
        <form className={styles.signOut}>
          <h1>サインアウトしますか?</h1>
          <FormButton
            value="サインアウト"
            onClick={onLogoutSubmit}
            className={styles.button}
          />
        </form>
        <Footer />
      </>
    );
  }
};

export default Logout;
