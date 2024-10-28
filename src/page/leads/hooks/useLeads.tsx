import AuthStore from "@/store/AuthStore";
import { setTokenHeader, getLeads } from "@/service/api/leads.api";
import { useEffect, useState } from "react";
import { Lead } from "@/types/leads";
import { deleteLead, updateLead } from "@/service/api/leads.api";

const useLeads = () => {
  const { token } = AuthStore();
  const [leads, setLeads] = useState<Lead[]>();
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead>();
  const [input, setInput] = useState<Lead>({
    code: "",
    name: "",
    branch: "",
    address: "",
    note: "",
    phone: "",
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

  const handleUpdate = () => {
    // update lead
    input['lead_probability_id'] = selectedLead?.probability?.id;
    input['lead_status_id'] = selectedLead?.status?.id;
    input['lead_type_id'] = selectedLead?.type?.id;

    setFilteredLeads((prev) => {
      if (prev) {
        const index = prev.findIndex((l) => l.id === input.id);
        prev[index] = input;
        return [...prev];
      }
      return prev;
    });

    setShowModal(false);
    updateLead(input).then(() => {
      setLeads((prev) => {
        if (prev) {
          const index = prev.findIndex((l) => l.id === input.id);
          prev[index] = input;
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

  return {
    leads: filteredLeads,
    setLeads,
    input,
    loading,
    showModal,
    setShowModal,
    selectedLead,
    handleDelete,
    handleEdit,
    handleSearch,
    handleInput,
    handleUpdate
  };
};

export default useLeads;
