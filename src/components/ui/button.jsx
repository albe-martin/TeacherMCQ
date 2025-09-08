import * as React from "react";

export function Button({ children, variant = "default", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition-colors focus:outline-none";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default}`} {...props}>
      {children}
    </button>
  );
}
