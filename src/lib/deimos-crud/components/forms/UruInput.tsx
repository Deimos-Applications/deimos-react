import React from "react";

const UruInput: React.FC<any> = ({
  controlId,
  label,
  placeholder,
  name,
  errors,
  values,
  handleChange,
  handleBlur,
  controlProps = {},
  onChange = (inputName: any, newValue: any) => {},
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={controlId}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={controlId}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={(e) => {
          onChange(name, e.target.value);
          handleBlur(e);
        }}
        {...controlProps}
        {...props}
      />
      {errors && !!errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]}</p>
      )}
    </div>
  );
};

export default UruInput;
