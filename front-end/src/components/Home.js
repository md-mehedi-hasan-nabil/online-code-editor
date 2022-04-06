import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Dialog from "./Dialog";

export default function Home() {
  const [theme, setTheme] = useState("vs-dark");
  const [editorCode, setEditorCode] = useState("");
  const [validateMessage, setValidateMessage] = useState([]);
  const [editorInfo, setEditorInfo] = useState({
    language: "python",
    value: "print('Hello world')",
  });
  const [output, setOutput] = useState("Output: ");
  const [dialog, setDialog] = useState(false);
  const [takeInput, setTakeInput] = useState(false);

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
    } else if (e.target.value === "cpp") {
      value = `
#include <stdio.h>
    int main() {
    printf("Hello, World!");
    return 0;
}`;
    } else {
      value = `
namespace HelloWorld
{
    class Hello {         
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");
        }
    }
}`;
    }
    setEditorInfo({
      language: e.target.value,
      value: value,
    });
    setEditorCode(value);
  }

  console.log(editorInfo);
  console.log(editorCode);

  function handleEditorDidMount(editor, monaco) {
    setEditorCode(editorInfo.value)
  }

  function checkTakeInput(code) {
    const { language } = editorInfo;
    if (language === "python") {
      const checked = code.includes("input");
      setTakeInput(checked);
    }
  }

  function handleEditorChange(value, event) {
    setEditorCode(value);
    setOutput("Output: ");
    checkTakeInput(value);
  }

  // code run and send post request to server
  function runCode() {
    const { language } = editorInfo;
    axios
      .post(`http://localhost:5000/${language}`, {
        editorCode,
        takeInput,
      })
      .then(function (response) {
        if (response.data.error) {
          const errors = response.data.error.split(",");
          console.log(errors[1]);
          setOutput(errors[1]);
        } else {
          setOutput("> " + response.data.output);
          console.log(response.data);
        }
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
    <React.Fragment>
      <Header
        changeTheme={changeTheme}
        theme={theme}
        changeLanguage={changeLanguage}
        runCode={runCode}
        openDialog={openDialog}
      />

      {dialog && <Dialog openDialog={openDialog} />}

      <CodeEditor
        theme={theme}
        editorInfo={editorInfo}
        handleEditorChange={handleEditorChange}
        handleEditorDidMount={handleEditorDidMount}
        output={output}
      />
    </React.Fragment>
  );
}
