import axios from "axios";
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Dialog from "./Dialog";
import Header from "./Header";

export interface EditorInfoType {
  language: string;
  value: string;
}

function Home(): JSX.Element {
  const [editorTheme, setEditorTheme] = useState<string>("vs-dark");
  const [editorCode, setEditorCode] = useState<string>("");
  const [editorInfo, setEditorInfo] = useState<EditorInfoType>({
    language: "python",
    value: "print('Hello world')",
  });
  const [output, setOutput] = useState<string>("Output: ");
  const [dialog, setDialog] = useState<boolean>(false);
  const [takeInput, setTakeInput] = useState<boolean>(false);


  // change code editor color
  function changeTheme(): void {
    if (editorTheme === "vs-dark") {
      setEditorTheme("vs-light");
    } else {
      setEditorTheme("vs-dark");
    }
  }

  // switch language
  function changeLanguage(e: React.FormEvent<EventTarget>): void {
    let target = e.target as HTMLInputElement;
    let value = "";
    if (target.value === "python") {
      value = "print('Hello world')";
    } else if (target.value === "java") {
      value = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`;
    } else if (target.value === "cpp") {
      value = `#include <stdio.h>
    int main() {
    printf("Hello, World!");
    return 0;
}`;
    } else {
      value = `namespace HelloWorld
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
      language: target.value,
      value: value,
    });
    setEditorCode(value);
  }

  // console.log(editorInfo);
  // console.log(editorCode);

  function handleEditorDidMount(editor: any, monaco: any) {
    // console.log("type::::::::" + typeof editor);
    setEditorCode(editorInfo.value);
  }

  function checkTakeInput(code: string) {
    const { language } = editorInfo;
    if (language === "python") {
      const checked = code.includes("input");
      setTakeInput(checked);
    }
  }

  function handleEditorChange(value: string | undefined): void {
    if (typeof value === "string") {
      setEditorCode(value);
      setOutput("Output: ");
      checkTakeInput(value);
    }
  }

  // code run and send post request to server
  function runCode() {
    console.log(editorCode, takeInput);
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
          setOutput("> " + response.data.output + "\n");
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function openDialog() {
    dialog ? setDialog(false) : setDialog(true);
  }

  return (
    <React.Fragment>
      <Header
      editorTheme={editorTheme}
        changeTheme={changeTheme}
        changeLanguage={changeLanguage}
        runCode={runCode}
        openDialog={openDialog}
      />

      {dialog && <Dialog openDialog={openDialog} />}

      <CodeEditor
        editorTheme={editorTheme}
        output={output}
        editorInfo={editorInfo}
        handleEditorChange={handleEditorChange}
        handleEditorDidMount={handleEditorDidMount}
      />
    </React.Fragment>
  );
}

export default Home;
