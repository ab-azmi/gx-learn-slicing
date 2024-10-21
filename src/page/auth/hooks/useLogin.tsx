import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../../store/AuthStore";

const useLogin = () => {
    const store = AuthStore();
    const navigate = useNavigate();

  const [input, setInput] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const hanldleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.login();
    navigate("/");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return {
    input,
    setInput,
    hanldleSubmit,
    handleInput,
  };
};

export default useLogin;
