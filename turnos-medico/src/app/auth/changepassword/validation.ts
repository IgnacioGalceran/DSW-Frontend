import Joi from "joi";

export const changePasswordValidation = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  repeatPassword: Joi.string().min(8).max(20).required(),
});

export const validate = async (data: any) => {
  if (!data) return false;

  const { error } = changePasswordValidation.validate(data);

  if (error) return false;
  return true;
};
