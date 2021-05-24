import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "../../../components/Profile";
import { aboutUser } from "../../../requests/userApi";
import styles from "../../../styles/user.module.scss";
import NavList from "../../../components/NavList/index";
import { getUserBlog } from "../../../requests/articleApi";
import ArticleList from "../../../components/ArticleList";
import FormButton from "../../../components/FormButton";
import useUser from "../../../data/useUser";
import Loading from "../../../components/Loading";
import Router from "next/router";
import Link from "next/link";
import Footer from "../../../components/Footer";

const Mypage = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState();
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(10);

  const { user, loading, loggedIn } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      Router.replace("/signIn");
    }
  }, [loading]);

  useEffect(() => {
    if (user && user.user_id) {
      const getUserAndBlogs = async (user_id) => {
        const user = await aboutUser(user_id);
        setUserProfile(user);
        const blogs = await getUserBlog(user_id);
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
      };
      getUserAndBlogs(user.user_id);
    }
  }, [user]);

  const handleShowMorePosts = useCallback(() => {
    setCount((pre) => {
      setCount(pre + 10);
    });
  }, []);

  if (!loggedIn || loading) {
    return <Loading />;
  }
  if (!userProfile || userProfile.id === null) {
    return <Loading />;
  }
  if (!loading && loggedIn && user) {
    return (
      <>
        <NavList />
        <div className={styles.container}>
          <Link href="/home/mypage/edit">
            <div className={styles.editBtn}>自己紹介を変更</div>
          </Link>
          <Profile user={userProfile} />
          <h1>これまでの投稿</h1>
          <div className={styles.articleArea}>
            {blogs.length ? blogs.slice(0, count) : null}
          </div>
          {blogs.length > count ? (
            <FormButton value="MORE" onClick={handleShowMorePosts} />
          ) : null}
          <Footer />
        </div>
      </>
    );
  }
};
export default Mypage;
