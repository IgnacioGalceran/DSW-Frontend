import Joi from "joi";

export const validateInsert = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.min": "La longitud mínima es de 6 caracteres",
      "string.max": "La longitud máxima es de 50 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  especialidad: Joi.string().min(24).max(24).messages({
    "string.min": "La longitud mínima es de 24 caracteres",
    "string.max": "La longitud máxima es de 24 caracteres",
  }),
  repeatPassword: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  matricula: Joi.string().min(2).max(50).required().messages({
    "string.min": "La longitud mínima es de 3 caracteres",
    "string.max": "La longitud máxima es de 10 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
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
  }),
});
