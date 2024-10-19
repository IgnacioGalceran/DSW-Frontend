import { Medicos } from "@/app/pages/medicos/type";

export type ModalTurnos = {
  openModal: {
    open: boolean;
    data: Medicos;
  };
  insert: any;
  setOpenModal: any;
};
