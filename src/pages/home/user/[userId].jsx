import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "../../../components/Profile";
import {
  aboutUser,
  follow,
  unFollow,
  verificationFollow,
} from "../../../requests/userApi";
import styles from "../../../styles/user.module.scss";
import NavList from "../../../components/NavList/index";
import { getUserBlog } from "../../../requests/articleApi";
import ArticleList from "../../../components/ArticleList";
import FormButton from "../../../components/FormButton";
import useUser from "../../../data/useUser";
import Loading from "../../../components/Loading";
import Router from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(10);
  const [isFollow, setIsFollow] = useState(false);

  const { user, loading, loggedIn } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
  }, [loading]);

  useEffect(() => {
    if (userProfile && userProfile.id === null) {
      Router.replace("/home");
    }
    if (user && Number(user.user_id) === Number(userId)) {
      Router.replace("/home/mypage");
    }
  }, [user, userId, userProfile]);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setUserId(router.query.userId);
    }
  }, [router]);

  useEffect(() => {
    if (userId) {
      const getUserAndBlogs = async (userId) => {
        const user = await aboutUser(userId);
        setUserProfile(user);
        const blogs = await getUserBlog(userId);
        if (blogs === []) return;
        const userArticles = blogs.map((blog, index) => {
          return (
            <ArticleList
              title={blog.title}
              key={index}
              url={`/home/article/${blog.id}`}
              author={blog.name}
              likeNumber={blog.likes_number}
            />
          );
        });
        setBlogs(userArticles);
        const vertFol = await verificationFollow(userId);
        if (vertFol) {
          setIsFollow(true);
        }
      };
      getUserAndBlogs(userId);
    }
  }, [userId]);

  const handleShowMorePosts = useCallback(() => {
    setCount((pre) => {
      setCount(pre + 10);
    });
  }, []);

  const clickFollow = async () => {
    if (!userId) return;
    const res = await follow(userId);
    const user = await aboutUser(userId);
    setUserProfile(user);
    setIsFollow(true);
  };

  const clickUnFollow = async () => {
    if (!userId) return;
    const res = await unFollow(userId);
    const user = await aboutUser(userId);
    setUserProfile(user);
    setIsFollow(false);
  };

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (!userProfile || userProfile.id === null) {
    return <Loading />;
  }
  if (!loading && loggedIn && user) {
    return (
      <div className={styles.container}>
        <NavList />
        <Profile user={userProfile} />
        {isFollow ? (
          <FormButton value="UnFollow" onClick={clickUnFollow} />
        ) : (
          <FormButton value="Follow" onClick={clickFollow} />
        )}
        <h1>Latest Articles </h1>
        <div className={styles.articleArea}>
          {blogs.length ? blogs.slice(0, 5) : <div>Not found articles</div>}
        </div>
        {blogs.length > count ? (
          <FormButton value="MORE" onClick={handleShowMorePosts} />
        ) : null}
      </div>
    );
  }
};

export default ProfilePage;
