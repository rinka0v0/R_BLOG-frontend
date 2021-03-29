import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useState } from "react";
import styles from "../CommentList/index.module.scss";

const CommentList = (props) => {
  const contentState = convertFromRaw(JSON.parse(props.comment));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className={styles.container}>
      <p className={styles.name}>{props.user_name}</p>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        readOnly='true'
        toolbarHidden
      />
    </div>
  );
};

export default CommentList;
