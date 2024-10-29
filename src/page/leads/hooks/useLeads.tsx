import AuthStore from "@/store/AuthStore";
import { setTokenHeader, getLeads, deleteLead, updateLead, getProbabilities } from "@/service/api/leads.api";
import { useEffect, useState } from "react";
import { Lead, Probability } from "@/types/leads";

const useLeads = () => {
  const { token } = AuthStore();
  const [leads, setLeads] = useState<Lead[]>();
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead>();
  const [probabilities, setProbabilities] = useState<Probability[]>();
  const [input, setInput] = useState<Lead>({
    code: "",
    name: "",
    branch: "",
    address: "",
    note: "",
    phone: "",
    lead_probability_id: 0,
    lead_status_id: 0,
    lead_type_id: 0,
  })

  useEffect(() => {
    if (token) {
      setLoading(true);
      setTokenHeader(token);
      getLeads().then((res) => {
        setLeads(res);
        setFilteredLeads(res);
        setLoading(false);
      });
      
      getProbabilities().then((res) => {
        setProbabilities(res);
      })
    }
  }, [token]);

  const handleDelete = (item: Lead) => {
    if (confirm("Are you sure?")) {
      deleteLead(item.id!).then(() => {
        setLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
        setFilteredLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
        alert("Deleted");
      });
    }
  };

  const handleEdit = (item: Lead) => {
    setSelectedLead(item);
    setShowModal(true);
    setInput(item);

    setInput({
      ...item,
      lead_probability_id: item?.probability?.id || 0,
      lead_status_id: item?.status?.id || 0,
      lead_type_id: item?.type?.id || 0,
    })
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleUpdate = () => {
    setFilteredLeads((prev) => {
      if (prev) {
        const index = prev.findIndex((l) => l.id === input.id);
        console.log(input.lead_probability_id);
        prev[index] = {
          ...input,
          probability: probabilities?.find((p) => p.id === Number(input.lead_probability_id)),
        };
        return [...prev];
      }
      return prev;
    });

    setShowModal(false);
    
    updateLead(input).then((res: Lead) => {
      setLeads((prev) => {
        if (prev) {
          const index = prev.findIndex((l) => l.id === input.id);
          prev[index] = res;
          return [...prev];
        }
        return prev;
      });
      alert("Updated");
    })
    .catch(() => {
      //revert back to original value
      setFilteredLeads((prev) => {
        if (prev) {
          const index = prev.findIndex((l) => l.id === input.id);
          prev[index] = selectedLead!;
          return [...prev];
        }
        return prev;
      });
      alert("Failed to update");
    })
  }

  const handleFilter = (name: string, value: string) => {
    if(value === "-1") {
      setFilteredLeads(leads);
      return;
    }

    if (name === "probability") {
      const filtered = leads?.filter((l) => l.probability?.id === Number(value));
      setFilteredLeads(filtered);
    }
    if (name === "status") {
      const filtered = leads?.filter((l) => l.status?.id === Number(value));
      setFilteredLeads(filtered);
    }
  };

  return {
    leads: filteredLeads,
    setLeads,
    input,
    loading,
    showModal,
    setShowModal,
    selectedLead,
    probabilities,
    handleSelect,
    handleDelete,
    handleEdit,
    handleSearch,
    handleInput,
    handleUpdate,
    handleFilter
  };
};

export default useLeads;
