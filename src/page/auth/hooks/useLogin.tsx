import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "@/store/AuthStore";
import { login } from "@/service/api/auth.api";

type params = {
  email: string;
  password: string;
  remember?: boolean;
};

const useLogin = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<params>();

  const [input, setInput] = useState<params>({
    email: "",
    password: "",
    remember: false,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }

    login({ email: input.email, password: input.password, remember: input.remember })
      .then((res) => {
        if (res?.result?.token) {
          store.setToken(res.result.token);
          store.setUser(res.result.user);
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
  };

  return {
    input,
    loading,
    errors,
    setInput,
    handleSubmit,
  };
};

export default useLogin;
