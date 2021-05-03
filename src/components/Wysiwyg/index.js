import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "../Wysiwyg/index.module.scss";
import FormButton from "../FormButton";
import { postArticle, editArticle } from "../../requests/articleApi";
import Router from "next/router";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { memo } from "react";

const Wysiwyg = memo((props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [title, setTitle] = useState(props.title);
  const [err, setErr] = useState("");

  const saveArticle = async () => {
    const data = editorState.getCurrentContent();
    if (editorState && title.trim().length !== 0) {
      try {
        const content = JSON.stringify(convertToRaw(data));
        console.log(content);
        const res = await postArticle({ title: title, data: content });
        Router.replace("/home");
      } catch (error) {
        setErr("err");
      }
    } else {
      setErr("lack");
    }
  };

  const rePostArticle = async () => {
    const data = editorState.getCurrentContent();
    if (title.trim().length !== 0 && data) {
      try {
        const content = JSON.stringify(convertToRaw(data));
        const res = await editArticle({
          title: title,
          data: content,
          blog_id: props.blog_id,
        });
        Router.replace("/home");
      } catch (error) {
        setErr("err");
      }
    } else {
      setErr("lack");
    }
  };

  useEffect(() => {
    if (props.data) {
      setEditorState(props.data);
    }
  }, [props.data]);

  return (
    <div className={styles.container}>
      {props.mode === "EDIT" ? (
        <>
          <FormButton value="EDIT" onClick={rePostArticle} />
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
      ) : null}
      {props.mode === "POST" ? (
        <>
          <FormButton value="POST" onClick={saveArticle} />
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
      ) : null}
      {err === "lack" ? (
        <div className={styles.error}>Please input title and article</div>
      ) : null}
      {err === "err" ? (
        <div className={styles.error}>Post failed...</div>
      ) : null}
      <div className={styles.editor}>
        {props.readOnly ? (
          <Editor
            editorState={props.data}
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
});

export default Wysiwyg;
