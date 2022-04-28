import React from "react";

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

export interface AppContextInterface {
  options: {
    fontSize: number;
    fontFamily: string;
  };
  theme: ThemeType;
}

export interface ContextValue {
  applicationContext: AppContextInterface;

  setApplicationContext: React.Dispatch<
    React.SetStateAction<AppContextInterface>
  >;
}
