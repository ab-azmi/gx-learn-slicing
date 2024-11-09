import {
  getLeads,
  deleteLead,
  updateLead,
  getProbabilities,
} from "@/service/api/leads.api";
import { useEffect, useRef, useState } from "react";
import { Lead, Probability } from "@/types/leads";
import useLogout from "@/hooks/useLogout";
import { Paginate } from "@/types/wraper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { leadPath } from "@/path/lead.path";

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
  const navigate = useNavigate();
  const { signout } = useLogout();

  const [leads, setLeads] = useState<Paginate<Lead>>();
  const backUpLeads = useRef<Paginate<Lead>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
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
        backUpLeads.current = res;
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

  // DONE : Use Sweet Alert Confirmation`
  // DONE : Add loading
  const handleDelete = (item: Lead) => {
    // setFilteredLeads((prev) => prev?.filter((lead) => lead.id !== item.id));
    const id = toast.loading("Deleting...");
    deleteLead(item.id!)
      .then(() => {
        toast.update(id, {
          render: "Deleted",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          alert("Unauthorized");
          signout();
          return;
        }

        toast.update(id, {
          render: "Failed to delete",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  // TODO : Dont close modal if failed
  const handleUpdate = () => {
    const temp = leads?.data ? [...leads.data] : [];

    setShowModal(false);

    updateLead(input)
      .then(() => {
        setInput(formInitial);
        alert("Updated");
      })
      .catch(() => {
        //revert back to original value
        setLeads({
          ...leads!,
          data: temp,
        });
        alert("Failed to update");
      });
  };

  const handleForm = () => {
    if (input.id) {
      handleUpdate();
    } else {
      navigate(leadPath.form);
    }
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

  const clearFilter = () => {
    setFilters({});
    setLeads(backUpLeads.current);
  };

  const refetchLeads = (page?: number) => {
    setLoading(true);
    getLeads(page, search, filters).then((res) => {
      setLeads(res);
      setLoading(false);
    });
  };

  return {
    leads,
    setLeads,
    input,
    loading,
    showModal,
    setShowModal,
    selectedLead,
    probabilities,
    search,
    setSearch,
    handleSelect,
    handleDelete,
    openModal,
    handleInput,
    handleForm,
    handleFilter,
    refetchLeads,
    clearFilter,
  };
};

export default useLeads;
