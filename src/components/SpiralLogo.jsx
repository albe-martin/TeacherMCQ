import React from "react";

export default function SpiralLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" stroke="#F97316" strokeWidth="2" />
      <path d="M16 29c-7.18 0-13-5.82-13-13S8.82 3 16 3s13 5.82 13 13c0 4.97-4.03 9-9 9-3.87 0-7-3.13-7-7s3.13-7 7-7c2.76 0 5 2.24 5 5s-2.24 5-5 5c-1.66 0-3-1.34-3-3s1.34-3 3-3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
