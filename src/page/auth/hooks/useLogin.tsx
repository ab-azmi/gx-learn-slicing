import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "@/store/AuthStore";
import { login } from "@/service/api/auth.api";

type params = {
  email: string;
  password: string;
};

const useLogin = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<params>();

  const [input, setInput] = useState<params>({
    email: "",
    password: "",
  });

  const validate = () => {
    const error: params = {
      email: "",
      password: "",
    };
    let isValid = true;

    if (input.email === "") {
      error.email = "Email is required";
      isValid = false;
    }

    if (input.password === "") {
      error.password = "Password is required";
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const hanldleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    if(!validate()) {
      setLoading(false);
      return;
    };

    login({ email: input.email, password: input.password })
      .then((res) => {
        if(res) {
          store.setToken(res.token);
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
      //hanya utk kelola data
      //tidk perlu handle error api
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
    loading,
    errors,
    setInput,
    hanldleSubmit,
    handleInput,
  };
};

export default useLogin;
