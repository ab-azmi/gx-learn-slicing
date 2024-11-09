import {
  getLeads,
  deleteLead,
  getProbabilities,
  createLead,
  updateLead,
} from "@/service/api/leads.api";
import { useEffect, useRef, useState } from "react";
import { Lead, Probability } from "@/types/leads";
import useLogout from "@/hooks/useLogout";
import { Paginate } from "@/types/wraper";
import { toast } from "react-toastify";

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

  const [leads, setLeads] = useState<Paginate<Lead>>();
  const backUpLeads = useRef<Paginate<Lead>>();

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
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

  const handleCreate = () => {
    const id = toast.loading("Creating...");
    setLoading(true);
    createLead(input).then(() => {
      setLoading(false);
      toast.update(id, {
        render: "Created",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    });
  };

  const handleUpdate = () => {
    const id = toast.loading("Updating...");
    setLoading(true);
    updateLead(input).then(() => {
      setLoading(false);
      toast.update(id, {
        render: "Updated",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    });
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
    probabilities,
    search,
    setSearch,
    setInput,
    handleSelect,
    handleDelete,
    handleInput,
    handleFilter,
    refetchLeads,
    clearFilter,
    handleCreate,
    handleUpdate,
  };
};

export default useLeads;
