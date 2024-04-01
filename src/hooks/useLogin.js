import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/apiURL";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (dataInput) => {
    const success = handleInputErrors(dataInput);

    if (!success) return;
    setLoading(true);
    try {
      // const response = await fetch(`${BASE_URL}login`, dataInput);
      // const data = await response.json();

      const res = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataInput),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(dataInput) {
  if (!dataInput.email || !dataInput.password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
