import useLeads from "./hooks/useLeads";

const Leads = () => {
  const { leads } = useLeads();

  return (
    <div className="p-4">
      <h3>
        Welcome to <span className="fw-bold">The Leads</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ipsum.
      </p>
    </div>
  );
};

export default Leads;
