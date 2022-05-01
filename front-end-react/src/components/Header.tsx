import React, { useContext } from "react";
import { ApplicationContext } from "../App";
import run from "../assets/caret-right.svg";
import dark from "../assets/moon.svg";
import light from "../assets/sun.svg";
import setting from "../assets/gear.svg";
import login from "../assets/arrow-return-right.svg";

interface HeaderProps {
  editorTheme: string;
  changeTheme: () => void;
  changeLanguage: (event: React.FormEvent<EventTarget>) => void;
  runCode: () => void;
  openDialog: () => void;
}

export default function Header({
  editorTheme,
  changeTheme,
  changeLanguage,
  runCode,
  openDialog,
}: HeaderProps) {
  const { applicationContext } = useContext(ApplicationContext);

  return (
    <header
      className={
        (applicationContext.theme as string) === "dark" ? "dark" : "light"
      }
    >
      <h1 className="logo">
        <a href="/">OnlineCodeEditor</a>
      </h1>
      <div
        className={
          (applicationContext.theme as string) === "dark"
            ? "header-dark"
            : "header-light"
        }
      >
        <select onChange={changeLanguage}>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={runCode}>
          <div className="d-flex">
            <p>Run</p>
            <img src={run} alt="caret-right" />
          </div>
        </button>

        <button onClick={changeTheme}>
          <div className="d-flex">
            <p>Theme</p>
            {editorTheme === "vs-light" ? (
              <img src={dark} alt="moon" />
            ) : (
              <img src={light} alt="sun" />
            )}
          </div>
        </button>
        <button onClick={openDialog}>
          <div className="d-flex">
            <p>Setting</p>
            <img src={setting} alt="setting" />
          </div>
        </button>
        <button>
          <div>
            <p>Login</p>
            <img src={login} alt="login" />
          </div>
        </button>
      </div>
    </header>
  );
}
