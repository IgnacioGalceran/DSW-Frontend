type Funciones = {
  id: string;
  nombre: string;
  roles: Roles[];
};

export type Roles = {
  id: string;
  nombre: string;
  funciones: Funciones[];
};
