import AuthStore from "@/store/AuthStore";
import { setTokenHeader, getLeads } from "@/service/api/leads.api";
import { useEffect, useState } from "react";
import { Lead } from "@/types/leads";
import { deleteLead } from "@/service/api/leads.api";

const useLeads = () => {
  const { token } = AuthStore();
  const [leads, setLeads] = useState<Lead[]>();
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      setTokenHeader(token);
      getLeads().then((res) => {
        setLeads(res);
        setFilteredLeads(res);
        setLoading(false);
      });
    }
  }, [token]);

  const handleDelete = (item: Lead) => {
    if (confirm("Are you sure?")) {
      deleteLead(item.id!).then(() => {
        setLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
        alert("Deleted");
      });
    }
  };

  const handleEdit = (item: Lead) => {
    alert(`Edit ${item.name}`);
  };

  const handleSearch = (value: string) => {
    const filtered = leads?.filter((l) => {
      //get values of objext l and check if any value includes the search value
      return Object.values(l).some((v) => {
        if (typeof v === "string") {
          return v.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    })
    setFilteredLeads(filtered);
  }

  return {
    leads: filteredLeads,
    setLeads,
    loading,
    handleDelete,
    handleEdit,
    handleSearch,
  };
};

export default useLeads;
