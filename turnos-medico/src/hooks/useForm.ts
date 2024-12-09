import { useState, useEffect } from "react";
import Joi, { ObjectSchema } from "joi";

interface UseFormReturn<T> {
  values: T;
  setValues: any;
  errors: Record<string, string>;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function useForm<T>(
  initialValues: T,
  schema: ObjectSchema<T>,
  callbackFunction: any
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setValues((prevValues: any) => ({
        ...prevValues,
        [parent]: {
          ...prevValues[parent],
          [child]: value,
        },
      }));
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const isPasswordOK = (): boolean => {
    const { password, repeatPassword } = values as any;
    if (repeatPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: "Las contraseñas no coinciden",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: "",
      }));
    }

    return true;
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const nextElement = e.relatedTarget as HTMLButtonElement;

    if (name === "repeatPassword") {
      if (!isPasswordOK()) {
        return;
      }
    }

    if (
      nextElement &&
      nextElement.tagName === "BUTTON" &&
      nextElement.type === "submit"
    ) {
      return;
    }

    const validationErrors = await validateField(name, value, schema);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = await validateForm(values, schema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && isPasswordOK()) {
      await callbackFunction(values);
    }
  };

  const validateField = async (
    name: string,
    value: any,
    schema: ObjectSchema<T>
  ) => {
    if (!schema.extract(name)) {
      return {};
    }
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    if (error) {
      return { [name]: error.details[0].message };
    }
    return {};
  };

  const validateForm = async (data: T, schema: ObjectSchema<T>) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const validationErrors: Record<string, string> = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      return validationErrors;
    }
    return {};
  };

  // Variable para evitar que se renderice infinitamente
  const [isInitialValuesSet, setIsInitialValuesSet] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitialValuesSet) {
      setValues(initialValues);
      setIsInitialValuesSet(true);
    }
  }, [initialValues, isInitialValuesSet]);

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

export default useForm;
