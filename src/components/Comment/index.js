import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "../Comment/index.module.scss";
import FormButton from "../FormButton";
import { postComment } from "../../requests/articleApi";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Comment = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [err, setErr] = useState("");

  const saveComment = async () => {
    const data = editorState.getCurrentContent();
    if (data) {
      try {
        const comment = JSON.stringify(convertToRaw(data));
        await postComment({ comment: comment, blog_id: props.blog_id });
        setEditorState(() => EditorState.createEmpty());
        props.mutate();
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr("lack");
    }
  };

  return (
    <div className={styles.container}>
      <FormButton value="COMMENT" onClick={saveComment} />
      {err === "lack" ? (
        <div className={styles.error}>Please input title </div>
      ) : (
        <></>
      )}
      <div className={styles.editor}>
        <Editor
          editorState={props.data ? props.data : editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
          readOnly={props.readOnly}
          placeholder="Please comment"
        />
      </div>
    </div>
  );
};

export default Comment;
