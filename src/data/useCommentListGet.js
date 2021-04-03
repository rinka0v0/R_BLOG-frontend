import useSWR from "swr";
import CommentList from "../components/CommentList";
import { getCommentList } from "../requests/articleApi";

const judgeComments = (comments) => {
  if (comments === undefined) {
    return undefined;
  } else {
    const commentlist = comments.map((comment, index) => {
      return (
        <CommentList
          comment={comment.text}
          user_name={comment.name}
          created={comment.created}
          key={index}
        />
      );
    });
    return commentlist;
  }
};

export default function useUser(id) {
  const { data, mutate, error } = useSWR(`${id}`, getCommentList, {
    initialData: [],
  });
  const comments = judgeComments(data);
  return {
    error,
    comments: comments,
    commentMutate: mutate,
  };
}
