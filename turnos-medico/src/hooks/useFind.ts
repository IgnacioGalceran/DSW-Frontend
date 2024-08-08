"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/const";

export default function useFind<T>(entity: string) {
  const [data, setData] = useState<response<T>>({
    data: [],
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const findData = async () => {
    try {
      const response = await fetch(`${API_URL}/${entity}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findData();
  }, [entity]);

  return { data, loading };
}
