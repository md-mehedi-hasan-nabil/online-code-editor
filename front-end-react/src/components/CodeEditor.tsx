import React, { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { EditorInfoType } from "./Home";
import { ApplicationContext } from "../App";

interface CodeEditorProp {
  editorTheme: string;
  output: string;
  editorInfo: EditorInfoType;
  handleEditorChange: (value: string | undefined) => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
}

export default function CodeEditor({
  editorTheme,
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

  const { applicationContext } = useContext(ApplicationContext);

  return (
    <>
      <main className="classThatSpecifiesTheSizeToWorkWith simple-vertical">
        <Split className="split-vertical" direction="vertical">
          <Editor
            language={editorInfo.language}
            value={editorInfo.value}
            theme={editorTheme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            // beforeMount={handleEditorWillMount}
            // onValidate={handleEditorValidation}
            options={applicationContext.options}
          />
          <div
            className={applicationContext.theme === "light" ? "light" : "dark"}
          >
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