import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({theme}) {
  const [editorInfo, seteditorInfo] = useState({
    language: "javascript",
    value: "console.log('Hello world')",
  });
  const [validateMessage, setValidateMessage] = useState([]);

  function handleEditorChange(value, event) {
    seteditorInfo({
      value: value,
    });
  }

  const options = {
    fontSize: 28,
  };
  return (
    <>
      <Editor
        // height="60vh"
        language={editorInfo.language}
        value={editorInfo.value}
        theme={theme}
        onChange={handleEditorChange}
        // onMount={handleEditorDidMount}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
        options={options}
      />
      <code style={{ color: "red", fontWeight: "bold" }}>
        {validateMessage !== [] && validateMessage}
      </code>
    </>
  );
}
