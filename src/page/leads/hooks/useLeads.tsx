import {
  getLeads,
  deleteLead,
  updateLead,
  createLead,
  getProbabilities,
} from "@/service/api/leads.api";
import { useEffect, useState } from "react";
import { Lead, Probability } from "@/types/leads";
import useLogout from "@/hooks/useLogout";

const formInitial = {
  code: "",
  name: "",
  branch: "",
  address: "",
  note: "",
  phone: "",
  lead_probability_id: 1,
  lead_status_id: 1,
  lead_type_id: 1,
};

const useLeads = () => {
  const { signout } = useLogout();
  
  const [leads, setLeads] = useState<Lead[]>();
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead>();
  const [probabilities, setProbabilities] = useState<Probability[]>();
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [input, setInput] = useState<Lead>(formInitial);

  useEffect(() => {
    setLoading(true);

    getLeads()
      .then((res) => {
        setLeads(res);
        setFilteredLeads(res);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          alert("Unauthorized");
          signout();
          return;
        }
      })
      .finally(() => {
        setLoading(false);
      });

    getProbabilities().then((res) => {
      setProbabilities(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = leads;

    //get all keys of filters. like ['probability', 'status']
    Object.keys(filters).forEach((key) => {
      //get value of key. like '1'
      const value = filters[key];
      //if value is -1 then return all leads
      if (value === "-1") return;

      //filter leads based on key and value
      if (key === "probability") {
        filtered = filtered?.filter((l) => l.probability?.id === Number(value));
      } else if (key === "status") {
        filtered = filtered?.filter((l) => l.status?.id === Number(value));
      }
    });

    //set filtered leads
    setFilteredLeads(filtered);
  }, [filters, leads]);

  const openModal = (item?: Lead) => {
    if (item) {
      setSelectedLead(item);
      setInput(item);

      setInput({
        ...item,
        lead_probability_id: item?.probability?.id,
        lead_status_id: item?.status?.id,
        lead_type_id: item?.type?.id,
      });
    }

    setShowModal(true);
  };

  const handleCreate = () => {
    setFilteredLeads((prev) => [input, ...prev!]);
    setShowModal(false);

    createLead(input)
      .then((res) => {
        setLeads((prev) => [res.data, ...prev!]);
        alert("Created");
        setInput(formInitial);
      })
      .catch(() => {
        alert("Failed to create");
        setShowModal(true);
        //remove the created lead from filtered leads without id
        setFilteredLeads(leads);
      });
  };

  const handleDelete = (item: Lead) => {
    if (confirm("Are you sure?")) {
      setFilteredLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
      deleteLead(item.id!)
        .then(() => {
          setLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
          alert("Deleted");
        })
        .catch((err) => {
          if (err.message === "Unauthorized") {
            alert("Unauthorized");
            signout();
            return;
          }

          alert("Failed to delete");
          //revert back to original value
          setFilteredLeads(leads);
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
        setInput(formInitial);
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
    openModal,
    handleSearch,
    handleInput,
    handleForm,
    handleFilter,
  };
};

export default useLeads;
