import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface IGlobalState {
    isAdmin: boolean;
}

interface IGlobalContextValue {
    state: IGlobalState;
    setState: Dispatch<SetStateAction<IGlobalState>>;
}


const GlobalContext = createContext<IGlobalContextValue | undefined>(undefined);

const GlobalProvider = ({children}: {children: ReactNode}) => {
    const [state, setState] = useState<IGlobalState>({
        isAdmin: true
    });

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    )
}

export {GlobalProvider, GlobalContext};