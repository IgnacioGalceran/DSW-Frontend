import { API_URL } from "@/constants/const";
import { useState } from "react";

export default function useCreate<T>(entity: string) {
  const [data, setData] = useState<response<T>>({
    data: [],
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const insert = async (form: T) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/${entity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      setData(data);
    } catch (error: any) {
      setData({
        data: [],
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { insert, data, loading };
}
