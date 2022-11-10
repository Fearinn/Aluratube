import React, { createContext, SetStateAction } from "react";

const ColorModeContext = createContext([
  "light",
  (() => {}) as React.Dispatch<SetStateAction<string>> ,
]);

export default ColorModeContext;
