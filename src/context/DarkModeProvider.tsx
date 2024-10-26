import {createContext, ReactNode, useEffect, useState} from "react";

type Props = {
    children: ReactNode;
}

type IDarkModeContext = {
    darkMode: string;
    setDarkMode: (darkMode: string) => void;
}

const getDarkModeCached = () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) return darkMode;
    return "auto";
}

const initialValue: IDarkModeContext = {
    darkMode: getDarkModeCached(),
    setDarkMode: () => {}
}

// Context
const DarkModeContext = createContext<IDarkModeContext>(initialValue);

// Provider
const DarkModeProvider = ({children}: Props) => {
    const [darkMode, setDarkMode] = useState(getDarkModeCached());

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

export {DarkModeProvider, DarkModeContext};