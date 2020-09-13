import React from "react";

const UruCheck: React.FC<any> = ({
  name,
  label,
  checked = false,
  onChange,
}) => {
  return (
    <div className="form-group">
      <input
        type="checkbox"
        name={name}
        id={name}
        value={checked}
        onChange={(newValue: any) => onChange(!checked)}
      />
      <label className="ml-2" htmlFor={name}>
        {label} {checked}
      </label>
    </div>
  );
};

export default UruCheck;
