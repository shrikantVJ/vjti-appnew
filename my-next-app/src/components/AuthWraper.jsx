import React from "react";
import { Button } from "./ui/button";

const AuthWarp = ({
  children,
  title,
  description
}) => {
  return (
    <section className="flex-col shadow-md space-y-4 rounded-lg w-[420px] p-8 border">
      <div className="flex flex-col my-5 items-center">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-slate-400 text-center my-3 w-[29ch] text-sm">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default AuthWarp;
