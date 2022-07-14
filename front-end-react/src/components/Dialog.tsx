import React, { useContext } from 'react';
import { ApplicationContext } from '../App';
import { ThemeType } from './AppContextInterfaceType';
import close from '../assets/x-lg.svg';

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

    if (name === 'theme') {
      newApplicationContext.theme = value as ThemeType;
      setApplicationContext(newApplicationContext);
    } else if (name === 'fontfamily') {
      newApplicationContext.options.fontFamily = value;
      setApplicationContext(newApplicationContext);
    } else if (name === 'fontsize') {
      newApplicationContext.options.fontSize = Number(value);
      setApplicationContext(newApplicationContext);
    }
  }

  return (
    <div className="absolute inset-0 z-10 backdrop-blur-xl bg-gray-200 bg-opacity-30 dark:bg-opacity-30 dark:bg-gray-800">
      <div
        className="absolute rounded-lg w-1/4 h-1/2 inset-2/4 bg-gray-200 dark:bg-gray-900"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="flex justify-between p-2 mb-3 border-b-2 dark:border-b-gray-100 border-b-gray-900">
          <h2 className="text-lg">Setting</h2>
          <div className="cursor-pointer" onClick={openDialog}>
            <img src={close} alt="close" />
          </div>
        </div>
        <div className="dialog_contant">
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
