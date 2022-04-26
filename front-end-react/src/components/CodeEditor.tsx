import React, { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { EditorInfoType } from "../App";
import { ApplicationContext } from "./ApplicationContext";

interface CodeEditorProp {
  output: string;
  editorInfo: EditorInfoType;
  handleEditorChange: (value: string | undefined) => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
}

export default function CodeEditor({
  output,
  editorInfo,
  handleEditorChange,
  handleEditorDidMount,
}: CodeEditorProp) {
  const [validateMessage, setValidateMessage] = useState([]);

  function handleEditorValidation(markers: any) {
    // model markers
    // markers.forEach((marker) => setValidateMessage(marker.message));
    console.log(markers);
  }

  //   console.log(editorInfo)

  const { theme, options } = useContext(ApplicationContext);

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
            // onValidate={handleEditorValidation}
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
