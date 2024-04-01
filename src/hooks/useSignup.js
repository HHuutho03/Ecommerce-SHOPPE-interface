import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/apiURL";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (dataInput) => {
    const success = handleInputErrors(dataInput);
    if (!success) return;
    setLoading(true);
    try {
      console.log("success", success);
      const res = await fetch(`${BASE_URL}signup`, {
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

  return { loading, signup };
};
export default useSignup;

function handleInputErrors(dataInput) {
  if (!dataInput.email || !dataInput.password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (dataInput.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
