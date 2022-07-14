import React, { useContext } from 'react';
import { ApplicationContext } from '../App';
import run from '../assets/caret-right.svg';
import dark from '../assets/moon.svg';
import light from '../assets/sun.svg';
import setting from '../assets/gear.svg';
import login from '../assets/arrow-return-right.svg';

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
    <header className="flex justify-between p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl dark:text-gray-50 text-gray-900">
        <a className='tracking-tighter font-bold' href="/">OnlineCodeEditor</a>
      </h1>
      <div>
        <select onChange={changeLanguage}>
          <option value="python">Python</option>
          <option value="go">Go</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={runCode}>
          <div className="flex justify-around">
            <p>Run</p>
            <img src={run} alt="caret-right" />
          </div>
        </button>

        <button onClick={changeTheme}>
          <div className="flex justify-around">
            <p>Theme</p>
            {editorTheme === 'vs-light' ? (
              <img src={dark} alt="moon" />
            ) : (
              <img src={light} alt="sun" />
            )}
          </div>
        </button>
        <button onClick={openDialog}>
          <div className="flex justify-around">
            <p>Setting</p>
            <img src={setting} alt="setting" />
          </div>
        </button>

      </div>
    </header>
  );
}
