import React from "react";
import classnames from "classnames";

export enum DeimosButtonVariant {
  Primary = "bg-blue-500 hover:bg-blue-700 text-white",
  Danger = "bg-red-500 hover:bg-red-700 text-white",
  Success = "bg-green-500 hover:bg-green-700 text-white",
  Light = "bg-gray-500 hover:bg-gray-700 text-white",
  Link = "text-blue-500 hover:text-blue-800",
}

interface DeimosButtonProps {
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: DeimosButtonVariant;
  loading?: boolean;
}

const DeimosButton: React.FC<DeimosButtonProps> = ({
  children,
  className,
  type = "button",
  disabled = false,
  onClick = () => {},
  variant = DeimosButtonVariant.Primary,
  loading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type as any}
      disabled={disabled}
      className={classnames(
        variant,
        "font-bold py-2 px-4 rounded flex items-center justify-start",
        className
      )}
    >
      {loading && (
        <img
          src="/loader.svg"
          alt="Loader"
          style={{ width: "16px", marginRight: "1rem" }}
        />
      )}
      {children}
    </button>
  );
};

export default DeimosButton;
