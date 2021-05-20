import { useEffect, useState } from "react";
import FormButton from "../../../../components/FormButton";
import Loading from "../../../../components/Loading";
import NavList from "../../../../components/NavList";
import useUser from "../../../../data/useUser";
import { aboutUser, postProfile } from "../../../../requests/userApi";
import styles from "../../../../styles/user.module.scss";
import Router from "next/router";

const MypageEdit = () => {
  const [profile, setProfile] = useState("");
  const [fetching, setFetching] = useState(true);

  const { user, loading, loggedIn } = useUser();

  const handleChange = (e) => {
    setProfile(e.target.value);
  };

  const onSaveClick = async (e) => {
    e.preventDefault();
    const res = await postProfile(profile);
    Router.replace('/home/mypage')
  };

  useEffect(() => {
    if (user) {
      const getUserProfile = async (user_id) => {
        const user = await aboutUser(user_id);
        setProfile(user.profile);
        setFetching(false);
      };
      getUserProfile(user.user_id);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
  }, [loading, user]);

  if (fetching) {
    return <Loading />;
  }

  if (!loggedIn || loading) {
    return <Loading />;
  }

  return (
    <>
      <NavList />
      <div className={styles.container}>
        <form method="put" onSubmit={onSaveClick}>
          <label>
            自己紹介:
            <textarea
              value={profile}
              onChange={handleChange}
              maxLength="1000"
              placeholder="自己紹介を書いてみよう"
            ></textarea>
          </label>
          <FormButton value="SAVE" />
        </form>
      </div>
    </>
  );
};

export default MypageEdit;
