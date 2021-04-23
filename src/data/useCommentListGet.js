import useSWR from "swr";
import CommentList from "../components/CommentList";
import { getCommentList } from "../requests/articleApi";

const judgeComments = (comment, user_id, mutate) => {
  if (comment === undefined) {
    return undefined;
  } else {
    const commentlist = comment.map((comment, index) => {
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

export default function useUser(id, user) {
  const { data, mutate, error } = useSWR(`${id}`, getCommentList, {
    initialData: [],
  });

  const comments =
    user !== undefined ? judgeComments(data, user.user_id, mutate) : [];

  return {
    error,
    comments: comments,
    commentMutate: mutate,
  };
}
