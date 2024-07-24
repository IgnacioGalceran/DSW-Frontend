"use client";
import { useEffect, useState } from "react";

export default function useFind<T>(entity: string) {
  const [data, setData] = useState<response<T>>();

  const findData = async () => {
    const response = await fetch(`http://localhost:4000/api/${entity}`);
    const data = await response.json();

    setData(data);
  };

  useEffect(() => {
    findData();
  }, [entity]);
  console.log(data);
  return { data };
}
