import React, { useState, createContext } from "react";
import "./App.css";
import {
  ContextValue,
  AppContextInterface,
  ThemeType,
} from "./components/AppContextInterfaceType";
import Home from "./components/Home";

const context: AppContextInterface = {
  options: {
    fontSize: 20,
    fontFamily: "Consolas",
  },
  theme: ThemeType.LIGHT,
};

export const ApplicationContext = createContext<ContextValue>({
  applicationContext: context,
  setApplicationContext: () => {},
});

export default function App() {
  const [applicationContext, setApplicationContext] =
    useState<AppContextInterface>(context);

  console.log(applicationContext);

  return (
    <ApplicationContext.Provider
      value={{ applicationContext, setApplicationContext }}
    >
      <Home />
    </ApplicationContext.Provider>
  );
}
