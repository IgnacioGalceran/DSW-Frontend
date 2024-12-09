import { Turnos } from "@/app/medico/turnos/type";
import { Medicos } from "@/app/pages/medicos/type";
import { Pacientes } from "@/app/pages/pacientes/type";

export type ModalTurnos = {
  openModal: {
    open: boolean;
    data: {
      medico: Medicos | null;
      paciente: Pacientes | null;
      turno: Turnos | null;
    };
  };
  insert: any;
  update?: any;
  setOpenModal: any;
  setOpenForm?: any;
  getTurnos: any;
};
