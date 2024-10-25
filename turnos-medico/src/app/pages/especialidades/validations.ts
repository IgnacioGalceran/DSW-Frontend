import Joi from "joi";

export const validateEspecialidades = Joi.object({
  nombre: Joi.string().min(6).max(50).required().messages({
    "string.min": "La longitud mínima es de 6 caracteres",
    "string.max": "La longitud máxima es de 50 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
});
