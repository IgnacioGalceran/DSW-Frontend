"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/const";

export default function useFind<T>(entity: string, id?: string) {
  const [data, setData] = useState<response<T>>({
    data: [],
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const findData = async () => {
    try {
      const url = id ? `${API_URL}/${entity}/${id}` : `${API_URL}/${entity}`
      const response = await fetch(`${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 498) {
        console.log("token expirado");
      }
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findData();
  }, [entity]);

  return { data, loading };
}
