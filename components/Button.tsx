import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "black" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses =
    "rounded font-medium focus:outline-none whitespace-nowrap duration-200 transition-all focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary_light: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    black: "bg-black text-white hover:bg-gray-900 focus:ring-black",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-1.5 text-md",
    large: "px-7 py-2 text-lg",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
        { [disabledClasses]: disabled }
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
