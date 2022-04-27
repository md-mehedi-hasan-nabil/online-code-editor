import React, { useState, createContext } from "react";
import "./App.css";
import Home from "./components/Home";

export const ApplicationContext = createContext({});

enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

export default function App() {
  const [applicationContext, setApplicationContext] = useState<object>({
    options: {
      fontSize: 20,
      fontFamily: "Consolas",
    },
    theme: ThemeType.LIGHT,
  });

  return (
    <ApplicationContext.Provider
      value={[applicationContext, setApplicationContext]}
    >
      <Home />
    </ApplicationContext.Provider>
  );
}
