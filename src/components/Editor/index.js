import EditorJS from "@editorjs/editorjs";

function Editor() {
  const editor = new EditorJS({
    holder: "editorjs",
  });
  return <div id="editorjs"></div>;
}

export default Editor;
