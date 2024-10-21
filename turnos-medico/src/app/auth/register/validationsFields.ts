import Joi from "joi";

export const registerPaciente = Joi.object({
  // uid: Joi.string().min(2).max(50).required(),
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(2)
    .max(30)
    .required(),
  lastname: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(2)
    .max(30)
    .required(),
  dni: Joi.string().min(8).max(10).required(),
  // tipoDni: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "string.empty": "El correo electrónico es requerido",
      "string.pattern.base": "Debe proporcionar un correo electrónico válido",
    }),
  password: Joi.string().min(8).max(20).required(),
  repeatPassword: Joi.string().min(8).max(20).required(),
});

export const validate = async (data: any) => {
  if (!data) return false;

  const { error } = registerPaciente.validate(data);

  if (error) return false;
  return true;
};
