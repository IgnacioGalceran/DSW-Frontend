import Joi from "joi";

export const validateUpdate = Joi.object({
  matricula: Joi.string().min(2).max(50).required().messages({
    "string.min": "La longitud mínima es de 3 caracteres",
    "string.max": "La longitud máxima es de 10 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  especialidad: Joi.string()
    .min(24)
    .max(24)
    .messages({
      "string.min": "La longitud mínima es de 24 caracteres",
      "string.max": "La longitud máxima es de 24 caracteres",
    })
    .allow(""),
  obrasocial: Joi.array()
    .messages({
      "string.min": "La longitud mínima es de 24 caracteres",
      "string.max": "La longitud máxima es de 24 caracteres",
    })
    .allow(null)
    .default([]),
  diasAtencion: Joi.array().allow(""),
  horaDesde: Joi.string().min(5).max(25).required().messages({
    "string.min": "La longitud mínima es de 5 caracteres",
    "string.max": "La longitud máxima es de 5 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  horaHasta: Joi.string().min(5).max(25).required().messages({
    "string.min": "La longitud mínima es de 5 caracteres",
    "string.max": "La longitud máxima es de 5 caracteres",
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
