import React from "react";

export default function Card({ children }) {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
}
