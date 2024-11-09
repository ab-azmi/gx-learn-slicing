import Button from "@/components/Button";
import { leadPath } from "@/path/lead.path";
import { useLocation, useNavigate } from "react-router-dom";

const Form = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  return (
    <div className="p-4">
      <Button onClick={() => navigate(leadPath.index)}>Back</Button>
      <h3 className="mt-3">
        Form <span className="fw-bold">{state ? "Edit" : "Create"}</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ipsum.
      </p>
      {state ? state.name : "Form"}
    </div>
  );
};

export default Form;
