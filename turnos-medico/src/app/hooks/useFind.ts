"use client";
import { useEffect, useState } from "react";

export default function useFind<T>(entity: string) {
  const [data, setData] = useState<response<T>>({
    data: [],
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const findData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/${entity}`);
      const data = await response.json();

      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findData();
  }, [entity]);

  console.log(data);
  return { data, loading };
}
