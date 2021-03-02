import Header from "../../components/Header/index";
import Article from "../../components/Article/index";
import useUser from "../../data/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { user, loading, loggedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  },[loggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (loggedIn && user) {
    return (
      <>
        <Header />
        <Article title="title" content="Hello!!" />
      </>
    );
  }
};

export default Home;
