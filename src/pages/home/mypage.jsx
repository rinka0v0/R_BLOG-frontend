import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ArticleList from "../../components/ArticleList";
import FormButton from "../../components/FormButton";
import Loading from "../../components/Loading";
import NavList from "../../components/NavList";
import { Profile } from "../../components/Profile";
import useUser from "../../data/useUser";
import { getUserBlog } from "../../requests/articleApi";
import { aboutUser } from "../../requests/userApi";
import styles from "../../styles/user.module.scss";

const Mypage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(false);
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

  //   const onFileChange = (e) => {
  //     const files = e.target.files;
  //     if (files.length) {
  //       const file = files[0];
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setImages(file);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       setImages(null);
  //     }
  //   };

  // const onFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const fileUrl = URL.createObjectURL(file);
  //   setImages(fileUrl);
  // };

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
        {/* <input
        type="file"
        onChange={(e) => {
          onFileChange(e);
        }}
      />
      {images ? (
        <div>
          <img src={images} />
        </div>
      ) : null} */}
        <Profile user={userProfile} />
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

export default Mypage;
