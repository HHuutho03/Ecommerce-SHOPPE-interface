import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/apiURL";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(localStorage.removeItem("chat-user"));
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
