import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import Split from "react-split-it";
import Output from "./Output";
import CodeEditor from "./CodeEditor";

export default function Home() {
  const [theme, setTheme] = useState("vs-dark");
  const [editorCode, setEditorCode] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [editorInfo, seteditorInfo] = useState({
    language: "javascript",
    value: "console.log('Hello world')",
  });
  const [output, setOuput] = useState("");
  const [dialog, setDialog] = useState(false);

  // change code editor color
  function changeTheme() {
    if (theme === "vs-dark") {
      setTheme("vs-light");
    } else {
      setTheme("vs-dark");
    }
  }

  // switch language
  function changeLanguage(e) {
    let value = "";
    if (e.target.value === "python") {
      value = "print('Hello world')";
    } else if (e.target.value === "java") {
      value = `public class Main {
        public static void main(String[] args) {
          System.out.println("Hello World");
        }
      }`;
    } else if (e.target.value === "c") {
      value = `#include <stdio.h>
        int main() {
        printf("Hello, World!");
        return 0;
    }
      `;
    } else {
      value = "console.log('Hello world')";
    }
    seteditorInfo({
      language: e.target.value,
      value: value,
    });
  }

  // function handleEditorDidMount(editor, monaco) {
  //   console.log("onMount: the editor instance:", editor);
  //   console.log("onMount: the monaco instance:", monaco);
  // }

  // function handleEditorWillMount(monaco) {
  //   console.log("beforeMount: the monaco instance:", monaco);
  // }

  // function handleEditorValidation(markers) {
  //   // model markers
  //   markers.forEach((marker) => setValidateMessage(marker.message));
  //   console.log(markers);
  // }

  // code run and send post request to server
  function runCode() {
    console.log(editorCode);
    // console.log(editorInfo);
    if (editorCode === "") {
      alert("blank");
      return;
    }
    const { language } = editorInfo;
    axios
      .post(`http://localhost:5000/${language}`, {
        editorCode,
      })
      .then(function (response) {
        setOuput("> " + response.data.output);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function openDialog() {
    if (dialog) {
      setDialog(false);
    } else {
      setDialog(true);
    }
  }

  return (
    <>
      <Header
        changeTheme={changeTheme}
        theme={theme}
        changeLanguage={changeLanguage}
        runCode={runCode}
        openDialog={openDialog}
      />

      {dialog && (
        <div className="dialog">
          <div className="setting_dialog">
            <div className="dialog_header">
              <h2>Setting</h2>
              <div className="close" onClick={openDialog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
            <div className="dialog_contant">dialog_contant</div>
          </div>
        </div>
      )}

      <main className="classThatSpecifiesTheSizeToWorkWith simple-vertical">
        <Split className="split-vertical" direction="vertical">
          <CodeEditor theme={theme} />

          <Output output={output} />
        </Split>
      </main>
    </>
  );
}
