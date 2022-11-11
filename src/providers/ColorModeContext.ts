import React, { createContext, SetStateAction } from "react";

const ColorModeContext = createContext({
  theme: "light",
  setTheme: (() => {}) as React.Dispatch<SetStateAction<string>> ,
});

export default ColorModeContext;
