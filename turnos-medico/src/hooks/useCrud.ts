// useCRUD.js
"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/const";
import { useToast } from "@/context/ToastContext";

export default function useCRUD<T>(entity: string, doFetch: boolean = true) {
  const [data, setData] = useState<response<T>>({
    data: [],
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const fetchData = async (id?: string) => {
    setLoading(true);
    try {
      let url = id ? `${API_URL}/${entity}/${id}` : `${API_URL}/${entity}`;
      const response = await fetch(`${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      setData(result);
    } catch (error: any) {
      setData({ data: [], error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchDataById = async (id: any) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/${entity}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching data");
      }

      setData(result);
      return result;
    } catch (error: any) {
      setData({ data: [], error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const insert = async (body: T) => {
    try {
      const response = await fetch(`${API_URL}/${entity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (!result.error) {
        showToast(result.message, "OK", 4000);
        if (doFetch) {
          await fetchData();
        }
      } else {
        showToast(result.message, "FAIL", 4000);
      }

      return result;
    } catch (error: any) {
      console.log(error);
      return { error: true, message: error.message };
    }
  };

  const update = async (id: string, form: any) => {
    try {
      const response = await fetch(`${API_URL}/${entity}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!result.error) {
        showToast(result.message, "OK", 4000);
        console.log("dofetch", doFetch);

        if (doFetch) {
          console.log("if", doFetch);
          await fetchData();
        }
      } else {
        showToast(result.message, "FAIL", 4000);
      }

      return result;
    } catch (error: any) {
      console.log(error);
      return { data: {}, error: true, message: error.message };
    }
  };

  const remove = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${entity}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();

      if (!result.error) {
        showToast(result.message, "OK", 4000);
        if (doFetch) {
          await fetchData();
        }
      } else {
        showToast(result.message, "FAIL", 4000);
      }

      return result;
    } catch (error: any) {
      return { error: true, message: error.message };
    }
  };

  return { data, fetchData, fetchDataById, loading, insert, update, remove };
}
