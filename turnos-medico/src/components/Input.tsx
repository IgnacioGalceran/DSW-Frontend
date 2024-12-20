import React from "react";

interface InputProps {
  type: string;
  name: string;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  id?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  onChange,
  onBlur,
  error,
  className,
  placeholder,
}) => {
  return (
    <div className="">
      <label className="block text-gray-700 text-sm font-bold">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={
          className
            ? className
            : ` shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error ? "border-red-500" : value ? "border-green-500" : ""
              }`
        }
        placeholder={placeholder}
      />
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

export default Input;
