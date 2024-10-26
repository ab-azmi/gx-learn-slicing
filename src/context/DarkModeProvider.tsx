import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

type IDarkModeContext = {
  darkMode: string;
  setDarkMode: (darkMode: string) => void;
};

const getDarkModeCached = () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode) return darkMode;
  return "light";
};

const initialValue: IDarkModeContext = {
  darkMode: getDarkModeCached(),
  setDarkMode: () => {},
};

// Context
const DarkModeContext = createContext<IDarkModeContext>(initialValue);

// Provider
const DarkModeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(getDarkModeCached());

  useEffect(() => {
    const onStorageUpdate = () => {
      // Update the local storage
      const mode = localStorage.getItem("darkMode");
      if (mode) {
        setDarkMode(mode);
        document.documentElement.setAttribute("data-bs-theme", mode);
      }
    };

    // Listen for changes in local storage
    window.addEventListener("storage", onStorageUpdate);

    // Set the theme on the document
    document.documentElement.setAttribute("data-bs-theme", darkMode);
    localStorage.setItem("darkMode", darkMode);

    return () => {
      // Remove the listener when the component is unmounted
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeProvider, DarkModeContext };
