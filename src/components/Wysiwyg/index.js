import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "../DraftEditor/index.module.scss";
import FormButton from "../FormButton";
import { post } from "../../requests/articleApi";
import Router from "next/router";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Wysiwyg = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");

  const saveData = async () => {
    const data = editorState.getCurrentContent();
    if (title && data) {
      try {
        const content = JSON.stringify(convertToRaw(data));
        const res = await post({ title: title, data: content });
        Router.replace("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr("lack");
    }
  };

  if (props.data) {
    console.log("データが渡されている");
  } else {
    console.log("データが渡されていません");
  }

  return (
    <div className={styles.container}>
      {props.readOnly ? (
        <></>
      ) : (
        <>
          <FormButton value="POST" onClick={saveData} />
          <label>
            title
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </>
      )}
      {err === "lack" ? (
        <div className={styles.error}>Please input title </div>
      ) : (
        <></>
      )}
      <div className={styles.editor}>
        <div style={{ marginLeft: 80 }}>
          {props.readOnly ? (
            <Editor
              editorState={props.data ? props.data : editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
              readOnly={props.readOnly}
              toolbarHidden
            />
          ) : (
            <Editor
              editorState={props.data ? props.data : editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
              readOnly={props.readOnly}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wysiwyg;
