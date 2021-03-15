import Header from "../../../components/Header/index"
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../components/Editor/index"), {
  ssr: false,
});

const Article = ({ blog }) => {
  const jsonData = JSON.parse(blog.body);
  return (
    <div>
      <Header/>
      <Editor readOnly={true} data={jsonData} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/auth/blogs");
  const json = await res.json();
  const blogs = json.results;
  const paths = blogs.map((blog) => {
    const stringId = blog.id.toString();
    return { params: { id: stringId } };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`http://localhost:3000/auth/blogs/${id}`);
  const json = await res.json();
  const blog = json.results[0];
  return { props: { blog } };
};

export default Article;
