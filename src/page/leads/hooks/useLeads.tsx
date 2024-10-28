import AuthStore from "@/store/AuthStore"
import { setTokenHeader, getLeads } from "@/service/api/leads.api";
import { useEffect, useState } from "react";
import { Lead } from "@/types/leads";
import { deleteLead } from "@/service/api/leads.api";

const useLeads = () => {
    const {token} = AuthStore();
    const [leads, setLeads] = useState<Lead[]>();
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (token) {
            setLoading(true);
            setTokenHeader(token);
            getLeads().then((res) => {
                setLeads(res);
                setLoading(false);
            });
        }
    }, [token])

    const handleDelete = (item: Lead) => {
      deleteLead(item.id!).then(() => {
        setLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
        alert("Deleted");
      })
    }

    const handleEdit = (item: Lead) => {
      console.log("Edit", item);
    }
  

  return {
    leads,
    setLeads,
    loading,
    handleDelete,
    handleEdit
  }
}

export default useLeads