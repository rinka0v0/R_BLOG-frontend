import EditorJS from "@editorjs/editorjs";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { post } from "../../requests/articleApi";
import FormInput from "../../components/FormInput/index";
import { EDITOR_JS_TOOLS } from "./constants";

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
        post({ title: title, data: outputData });
      })
      .catch((error) => {
        console.log("Post failed: ", error);
      });
  };

  const [title, setTitle] = useState("");

  return (
    <>
      {props.readOnly ? (
        <></>
      ) : (
        <>
          <button onClick={saveData}>投稿する</button>
          <FormInput
            label="title"
            name="title"
            type=""
            value={title}
            onChange={setTitle}
          />
        </>
      )}
      <div id="editorjs" className={styles.container}></div>
    </>
  );
};

export default Editor;
