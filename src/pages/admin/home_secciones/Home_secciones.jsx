import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SelectorSecciones from "../../../components/admin/home_secciones/SelectorSecciones";

const Home_secciones = () => {
  const { pathname } = useLocation();

  const showSelector = pathname === "/admin/home_secciones";

  return (
    <>
      {showSelector && <SelectorSecciones />}
      <Outlet />
    </>
  );
};

export default Home_secciones;
