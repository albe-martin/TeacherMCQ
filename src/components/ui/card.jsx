import * as React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white shadow rounded p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 font-bold text-lg ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
