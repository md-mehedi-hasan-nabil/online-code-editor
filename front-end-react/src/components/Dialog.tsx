import React, { useContext } from "react";
import { ApplicationContext } from "../App";
import { ThemeType } from "./AppContextInterfaceType";
import close from "../assets/x-lg.svg";

type DialogProp = {
  openDialog: () => void;
};

export default function Dialog({ openDialog }: DialogProp) {
  const { applicationContext, setApplicationContext } =
    useContext(ApplicationContext);

  function changeAppSetting(e: React.FormEvent<EventTarget>): void {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    const name = target.name;
    const newApplicationContext = {
      ...applicationContext,
    };

    if (name === "theme") {
      newApplicationContext.theme = value as ThemeType;
      setApplicationContext(newApplicationContext);
    } else if (name === "fontfamily") {
      newApplicationContext.options.fontFamily = value;
      setApplicationContext(newApplicationContext);
    } else if (name === "fontsize") {
      newApplicationContext.options.fontSize = Number(value);
      setApplicationContext(newApplicationContext);
    }
  }

  return (
    <div
      className={
        applicationContext.theme === "light" ? "light dialog" : "dark dialog"
      }
    >
      <div className="setting_dialog">
        <div className="dialog_header">
          <h2>Setting</h2>
          <div className="close" onClick={openDialog}>
            <img src={close} alt="close" />
          </div>
        </div>
        <div className="dialog_contant">
          <div>
            <h3>App Theme</h3>
            <select
              name="theme"
              onChange={changeAppSetting}
              value={applicationContext.theme}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <hr />
          <div>
            <h3>Font Family</h3>
            <select
              name="fontfamily"
              onChange={changeAppSetting}
              value={applicationContext.options.fontFamily}
            >
              <option value="Monaco">Monaco</option>
              <option value="Consolas">Consolas</option>
              <option value="Menlo">Menlo</option>
              <option value="Courier New">Courier New</option>
              <option value="Droid Sans Mono">Droid Sans Mono</option>
            </select>
          </div>
          <hr />
          <div>
            <h3>Font Size</h3>
            <select
              name="fontsize"
              onChange={changeAppSetting}
              value={applicationContext.options.fontSize}
            >
              <option value="20">20</option>
              <option value="22">22</option>
              <option value="24">24</option>
              <option value="26">26</option>
              <option value="28">28</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
