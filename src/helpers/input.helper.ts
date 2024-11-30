const handleInput = <T extends object>(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setData: React.Dispatch<React.SetStateAction<T>>,
    input: T
) => {
    const { name, value } = e.target;
    setData({
      ...input,
      [name]: value,
    });
  };

  export default handleInput;