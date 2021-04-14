import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "../Wysiwyg/index.module.scss";
import FormButton from "../FormButton";
import { postArticle } from "../../requests/articleApi";
import Router from "next/router";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Wysiwyg = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // propsで記事の内容が渡されている場合はエディタにsetする。
  useEffect(() => {
    if (props.data) {
      setEditorState(props.data);
    }
  }, []);

  const [title, setTitle] = useState(props.title);
  const [err, setErr] = useState("");

  const saveData = async () => {
    const data = editorState.getCurrentContent();
    if (title.trim().length !== 0 && data) {
      try {
        const content = JSON.stringify(convertToRaw(data));
        const res = await postArticle({ title: title, data: content });
        Router.replace("/home");
      } catch (error) {
        console.log(error);
        setErr("err");
      }
    } else {
      setErr("lack");
    }
  };

  return (
    <div className={styles.container}>
      {props.readOnly ? (
        <></>
      ) : (
        <>
          <FormButton value={props.btnValue} onClick={saveData} />
          <label>
            title
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              maxLength="20"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </>
      )}
      {err === "lack" ? (
        <div className={styles.error}>Please input title and article</div>
      ) : null}
      {err === "err" ? (
        <div className={styles.error}>Post failed...</div>
      ) : null}
      <div className={styles.editor}>
        {props.readOnly ? (
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={setEditorState}
            readOnly={props.readOnly}
            toolbarHidden
          />
        ) : (
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={setEditorState}
            readOnly={props.readOnly}
          />
        )}
      </div>
    </div>
  );
};

export default Wysiwyg;
