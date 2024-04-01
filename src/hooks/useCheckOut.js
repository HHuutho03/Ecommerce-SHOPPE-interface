import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/apiURL";
const useCheckOut = () => {
  const [loading, setLoading] = useState(false);

  const checkOut = async (dataInput) => {
    const success = handleInputErrors(dataInput);
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}api/save-all-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataInput),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkOut };
};
function handleInputErrors(dataInput) {
  console.log("dataInput", dataInput);
  if (!dataInput.arrOrder || !dataInput.userInfo) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
export default useCheckOut;
