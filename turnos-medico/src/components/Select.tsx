import React from "react";

interface SelectProps {
  name: string;
  value: string | number | string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  options: Array<{ id: string | number; nombre: string }>;
  error?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  placeholder,
  className,
  multiple = false,
}) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold">
        {placeholder}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        multiple={multiple}
        className={`shadow border rounded w-full py-2 px-3 mt-1 text-gray-700 focus:outline-none focus:shadow-outline cursor-pointer ${className} ${
          error ? "border-red-500" : value ? "border-green-500" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.id}>
            {option.nombre}
          </option>
        ))}
      </select>
      <p
        className={`text-red-500 text-xs italic ${
          error ? "visible" : "invisible"
        }`}
        style={{ minHeight: "1.25rem" }}
      >
        {error || " "}
      </p>
    </div>
  );
};

export default Select;
