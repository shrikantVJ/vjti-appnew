import React from "react";
import { Button } from "../ui/button";

const AdminNavbar = () => {
  return (
    <div className=" flex border-b py-[0.9rem] justify-between px-5">
      <h1>Admin</h1>
      <Button variant="outline">Log Out</Button>
    </div>
  );
};

export default AdminNavbar;
