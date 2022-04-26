import React from "react";

type DialogProp = {
  openDialog: () => void;
};

export default function Dialog({ openDialog }: DialogProp) {
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
          <div className="d-flex">
            <h3>App Theme</h3>
            <select>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <hr />
          <div className="d-flex">
            <h3>Font Family</h3>
            <select>
              <option value="Monaco">Monaco</option>
              <option value="Consolas">Consolas</option>
              <option value="Menlo">Menlo</option>
              <option value="Courier New">Courier New</option>
              <option value="Droid Sans Mono">Droid Sans Mono</option>
            </select>
          </div>
          <hr />
          <div className="d-flex">
            <h3>Cursor Width</h3>
            <select>
              <option value="12">12</option>
              <option value="14">14</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
