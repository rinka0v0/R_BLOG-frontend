import useSWR from "swr";
import CommentList from "../components/CommentList";
import { getCommentList } from "../requests/articleApi";

const judgeComments = (comments, user_id, mutate) => {
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
          id={comment.id}
          comment_User_Id={comment.user_id}
          user_id={user_id}
          mutate={mutate}
        />
      );
    });
    return commentlist;
  }
};

export default function useUser(id, user_id) {
  const { data, mutate, error } = useSWR(`${id}`, getCommentList, {
    initialData: [],
  });
  const comments = judgeComments(data, user_id, mutate);
  return {
    error,
    comments: comments,
    commentMutate: mutate,
  };
}
