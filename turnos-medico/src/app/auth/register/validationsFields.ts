import Joi from "joi";


export const registerPaciente = Joi.object({
    // uid: Joi.string().min(2).max(50).required(),
    name: Joi.string().pattern(/^[A-Za-z]+$/).min(2).max(30).required(),
    lastname: Joi.string().pattern(/^[A-Za-z]+$/).min(2).max(30).required(),
    dni: Joi.string().min(8).max(10).required(),
    tipoDni: Joi.string().min(2).max(30).required(),
  });
  
  export const validate = async (data: any) => {
    // console.log(data)
    if (!data) return false
    const { error } = registerPaciente.validate(data)
    console.log(error)
    if(error) return false
    return true
}
