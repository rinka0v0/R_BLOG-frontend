import Header from '../../components/Header/index'
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor/index"), {
  ssr: false,
});

const Post = () => {
  return (
    <>
      <Header />
      <div>
        <Editor />
      </div>
    </>
  );
};

export default Post;
