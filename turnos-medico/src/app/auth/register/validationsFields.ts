import Joi from "joi";

export const registerPaciente = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  repeatPassword: Joi.string().min(8).max(20).required(),
  usuario: Joi.object({
    uid: Joi.string().min(0).max(50).allow(null),
    nombre: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    apellido: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    tipoDni: Joi.string().required().required().messages({
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    dni: Joi.number().min(1000000).max(60000000).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 7 números",
      "number.max": "La longitud máxima es de 8 números",
      "any.required": "Este campo es requerido *",
    }),
    email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.empty": "El correo electrónico es requerido",
      "string.pattern.base": "Debe proporcionar un correo electrónico válido",
    }),
  }),
});

export const validate = async (data: any) => {
  if (!data) return false;

  const { error } = registerPaciente.validate(data);

  if (error) return false;
  return true;
};
