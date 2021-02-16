import EditorJS from "@editorjs/editorjs";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";

function Editor() {
  const editor = new EditorJS({
    holder: "editorjs",
  });

  useEffect(() => {
    return function () {
      destroyEditor();
    }
  })

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
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  return (
    <div>
      <div id="editorjs" className={styles.container}></div>
      <button onClick={saveData}>save data</button>
    </div>
  );
}

export default Editor;
