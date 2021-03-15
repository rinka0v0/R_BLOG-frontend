import EditorJS from "@editorjs/editorjs";
import styles from "./index.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { post } from "../../requests/articleApi";
import { EDITOR_JS_TOOLS } from "./constants";
import FormButton from "../FormButton";

const Editor = (props) => {
  const editor = new EditorJS({
    holder: "editorjs",
    tools: EDITOR_JS_TOOLS,
    readOnly: props.readOnly,
    data: props.data,
  });

  useEffect(() => {
    return () => {
      destroyEditor();
    };
  });

  const destroyEditor = () => {
    return new Promise((resolve, reject) => {
      if (!editor) {
        resolve();
        return;
      }

      editor.isReady
        .then(() => {
          if (editor) {
            editor.destroy();
          }
          resolve();
        })
        .catch(reject);
    });
  };

  const saveData = () => {
    editor
      .save()
      .then((outputData) => {
        post({ title: inputEl.current.value, data: outputData });
      })
      .catch((error) => {
        console.log("Post failed: ", error);
      });
  };

  const [title, setTitle] = useState("");
  const inputEl = useRef(null);

  return (
    <>
      {props.readOnly ? (
        <></>
      ) : (
        <>
        <FormButton value="投稿する" onClick={saveData}/>
          <label htmlFor="title">
            title
            <input ref={inputEl}  type="text" name="title" />
          </label>
        </>
      )}
      <div id="editorjs" className={styles.container}></div>
    </>
  );
};

export default Editor;
