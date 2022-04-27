import React, { useContext } from "react";
import { ApplicationContext } from "../App";

type DialogProp = {
  // handleContext: () => void;
  openDialog: () => void;
};

export default function Dialog({ openDialog }: DialogProp) {
  const [applicationContext, setApplicationContext] =
    useContext(ApplicationContext);

  function changeAppSetting(e: React.FormEvent<EventTarget>): void {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    const name = target.name;
    const newApplicationContext = {
      ...applicationContext,
    };

    if (name === "theme") {
      newApplicationContext.theme = value;
      setApplicationContext(newApplicationContext);
    } else if (name === "fontfamily") {
      newApplicationContext.options.fontFamily = value;
    }
  }

  return (
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
            <select name="fontfamily" onChange={changeAppSetting}>
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
            <select name="fontsize" onChange={changeAppSetting}>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="14">18</option>
              <option value="20">20</option>
              <option value="22">22</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
