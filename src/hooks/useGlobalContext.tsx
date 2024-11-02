import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("useGlobalContext must be used within GlobalProvider");
    }
    return context;
}

export default useGlobalContext;