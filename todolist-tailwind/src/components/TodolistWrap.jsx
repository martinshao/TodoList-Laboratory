import React from "react";

export default function TodolistWrap({children}) {
  return (
    <div className="w-screen h-screen flex justify-center bg-yellow-400/75">
      <div className="w-80">{children}</div>
    </div>
  );
}
