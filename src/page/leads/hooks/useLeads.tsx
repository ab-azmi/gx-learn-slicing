import AuthStore from "@/store/AuthStore";
import {
  setTokenHeader,
  getLeads,
  deleteLead,
  updateLead,
  getProbabilities,
} from "@/service/api/leads.api";
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
  const [filters, setFilters] = useState<{[key:string]: string}>({});
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
  });

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
      });
    }
  }, [token]);

  const openModal = (item? : Lead) => {
    if(item){
      setSelectedLead(item);
      setInput(item);
  
      setInput({
        ...item,
        lead_probability_id: item?.probability?.id || 0,
        lead_status_id: item?.status?.id || 0,
        lead_type_id: item?.type?.id || 0,
      });
    }

    setShowModal(true);
  }

  const handleCreate = () => {
    alert("Create");
  }

  const handleDelete = (item: Lead) => {
    setFilteredLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
    if (confirm("Are you sure?")) {
      deleteLead(item.id!)
        .then(() => {
          setLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
          alert("Deleted");
        })
        .catch(() => {
          alert("Failed to delete");
          setFilteredLeads((prev) => [...prev!, item]);
        });
    }
  };

  const handleUpdate = () => {
    setFilteredLeads((prev) => {
      if (prev) {
        const index = prev.findIndex((l) => l.id === input.id);
      
        prev[index] = {
          ...input,
          probability: probabilities?.find(
            (p) => p.id === Number(input.lead_probability_id)
          ),
        };
        return [...prev];
      }
      return prev;
    });

    setShowModal(false);

    updateLead(input)
      .then((res) => {
        setLeads((prev) => {
          if (prev) {
            const index = prev.findIndex((l) => l.id === input.id);
            prev[index] = res.data;
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
      });
  };

  const handleForm = () => {
    if (input.id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  const handleSearch = (value: string) => {
    const filtered = leads?.filter((l) => {
      //get values of objext l and check if any value includes the search value
      return Object.values(l).some((v) => {
        if (typeof v === "string") {
          return v.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    });
    setFilteredLeads(filtered);
  };

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
  };

  const handleFilter = (name: string, value: string) => {
    //add filter to filters state
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let filtered = leads;

    //get all keys of filters. like ['probability', 'status']
    Object.keys(filters).forEach((key) => {
      //get value of key. like '1'
      const value = filters[key];
      //if value is -1 then return all leads
      if(value === "-1") return;

      //filter leads based on key and value
      if(key === "probability") {
        filtered = filtered?.filter((l) => l.probability?.id === Number(value));
      } else if(key === "status") {
        filtered = filtered?.filter((l) => l.status?.id === Number(value));
      }
    });

    //set filtered leads
    setFilteredLeads(filtered);
  }, [filters, leads]);

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
    openModal ,
    handleSearch,
    handleInput,
    handleForm,
    handleFilter,
  };
};

export default useLeads;
