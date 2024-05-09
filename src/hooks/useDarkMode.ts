import {useState} from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function _enableDarkMode() {
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  }

  function _disableDarkMode() {
    document.documentElement.classList.remove("dark");
    setDarkMode(false);
  }

  function toggleTheme() {
    if (darkMode) return _disableDarkMode();
    return _enableDarkMode();
  }

  return {
    darkMode,
    toggleTheme
  };
}