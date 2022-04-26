import React from "react";

type OptionType = {
  fontSize: number;
  fontFamily: string;
  cursorWidth: number;
};

type ContextType = {
  options: OptionType;
  theme: string;
  dialog: boolean;
};

export const ApplicationContext = React.createContext<ContextType>({
  options: {
    fontSize: 20,
    fontFamily: "",
    cursorWidth: 12,
  },
  theme: "vs-dark",
  dialog: false,
});
