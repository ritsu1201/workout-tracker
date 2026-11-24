import { Outlet, useLocation } from "react-router";
import { useState } from "react";
import Header from "../components/Header";
import "../css/MainLayout.css";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="main-layout">
      <Header location={location} open={open} setOpen={setOpen} />
      <Outlet />
    </div>
  );
}
