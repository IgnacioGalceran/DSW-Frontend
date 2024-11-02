import { Pacientes } from "@/app/pages/pacientes/type";
import Loader from "@/components/Loader";
import useCRUD from "@/hooks/useCrud";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DataProfile = () => {
  const {
    fetchData: getPacientes,
    data: usuarios,
    loading,
    insert,
    update,
    remove,
  } = useCRUD<Pacientes>("usuarios");
  const dispatch = useDispatch();

  const { displayName, email } = useSelector((state: any) => state.auth);

  const [dataUpdate, setDataUpdate] = useState<Pacientes | undefined>(
    undefined
  );

  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  useEffect(() => {
    getPacientes();
  }, []);
  console.log(usuarios);

  return (
    <>
      {loading && <Loader />}
      div
      <div>{displayName}</div>
      <div>{email}</div>
    </>
  );
};
