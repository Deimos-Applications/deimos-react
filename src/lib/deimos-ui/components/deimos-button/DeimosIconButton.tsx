import React from "react";
import classnames from "classnames";

const DeimosIconButton: React.FC<any> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center",
        className
      )}
    >
      {children}
    </button>
  );
};

export default DeimosIconButton;
