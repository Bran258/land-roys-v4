import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SeleccionInvetarios from "../../../components/admin/inventarios/SeleccionInvetarios";

const Inventarios = () => {
  const { pathname } = useLocation();

  const showSelector = pathname === "/admin/inventarios";

  return (
    <>
      {showSelector && <SeleccionInvetarios />}
      <Outlet />
    </>
  );
};

export default Inventarios;