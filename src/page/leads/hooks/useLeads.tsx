import AuthStore from "@/store/AuthStore"
import { setTokenHeader, getLeads } from "@/service/api/leads.api";
import { useEffect, useState } from "react";

const useLeads = () => {
    const {token} = AuthStore();
    const [leads, setLeads] = useState([]);
    
    useEffect(() => {
        if (token) {
            setTokenHeader(token);
            getLeads().then((res) => console.log(res));
        }
    }, [token])

  return {
    leads,
    setLeads
  }
}

export default useLeads