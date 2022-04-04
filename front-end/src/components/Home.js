import React, { useState } from "react";
import Header from "./Header";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function Home() {
  const [theme, setTheme] = useState("vs-dark");
  const [editorCode, setEditorCode] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [editorInfo, seteditorInfo] = useState({
    language: "javascript",
    value: "console.log('Hello world')",
  });

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
      value = 
      `#include <stdio.h>
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

  function handleEditorChange(value, event) {
    setEditorCode(value);
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => setValidateMessage(marker.message));
    console.log(markers);
  }

  // code run and send post request to server
  function runCode() {
    console.log(editorCode);
    console.log(editorInfo);
    const { language } = editorInfo;
    axios
      .post(`http://localhost:5000/${language}`, {
        editorCode,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <>
      <Header
        changeTheme={changeTheme}
        theme={theme}
        changeLanguage={changeLanguage}
        runCode={runCode}
      />

      <Editor
        height="60vh"
        language={editorInfo.language}
        value={editorInfo.value}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
      <code style={{ color: "red", fontWeight: "bold" }}>
        {validateMessage !== [] && validateMessage}
      </code>

      <div className="output">Input Output</div>
    </>
  );
}
