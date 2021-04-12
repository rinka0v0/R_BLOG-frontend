import { convertFromRaw, Editor, EditorState } from "draft-js";
import styles from "../CommentList/index.module.scss";
import FormButton from "../FormButton";
import { commentDelete } from "../../requests/articleApi";

const CommentList = (props) => {
  const contentState = convertFromRaw(JSON.parse(props.comment));
  const editorState = EditorState.createWithContent(contentState);

  const onDeleteClick = async () => {
    if (confirm("コメントを削除しますか？")) {
      await commentDelete(props.id);
      props.mutate();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.name}>{props.user_name}</p>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        readOnly="true"
        toolbarHidden
      />
      <p className={styles.time}>{props.created}</p>
      <div>
        {props.user_id === props.comment_User_Id ? (
          <FormButton value="DELETE" onClick={onDeleteClick} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentList;
