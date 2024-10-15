import Joi from "joi";

export const validateTurnos = Joi.object({
  fecha: Joi.date(),
  especialidad: Joi.string().min(24).max(24).required(),
});

export const validate = (data: any) => {
  if (!data) return { error: true, message: "Datos inválidos" };

  const { error } = validateTurnos.validate(data, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce((acc: any, curr: any) => {
      const path = curr.path.join(".");
      acc[path] = curr.message;
      return acc;
    }, {});
    return { error: true, message: errors };
  }

  return { error: false, message: "" };
};
