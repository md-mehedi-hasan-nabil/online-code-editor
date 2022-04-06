import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split-it";

export default function CodeEditor({
  theme,
  output,
  editorInfo,
  handleEditorChange,
  handleEditorDidMount
}) {
  // const [value, set]

  const [validateMessage, setValidateMessage] = useState([]);

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => setValidateMessage(marker.message));
    console.log(markers);
  }



  const options = {
    fontSize: 20,
  };

  //   console.log(editorInfo)

  return (
    <>
      <main className="classThatSpecifiesTheSizeToWorkWith simple-vertical">
        <Split className="split-vertical" direction="vertical">
          <Editor
            language={editorInfo.language}
            value={editorInfo.value}
            theme={theme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            // beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
            options={options}
          />
          <div>
            <code style={{ color: "red", fontWeight: "bold" }}>
              {validateMessage !== [] && validateMessage}
            </code>
            <div className="output">{output && output}</div>
          </div>
        </Split>
      </main>
    </>
  );
}
