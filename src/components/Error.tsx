import type React from "react";

export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ backgroundColor: "#f28095", padding: "0.2rem 1rem" }}>
      {children}
    </p>
  );
}
