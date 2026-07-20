"use client";

import { useLayoutEffect } from "react";

const ThemeProvider = ({ children }) => {
  useLayoutEffect(() => {
    if (window && window?.localStorage !== "undefined") {
      const theme = localStorage.getItem("theme") || "light";
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, []);
  return <>{children}</>;
};

export default ThemeProvider;
