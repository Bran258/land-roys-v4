import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./util/ProtectedRoute";

/* Layouts */
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";

/* Páginas cliente */
import Home from "./pages/client/home/Home";
import Nosotros from "./pages/client/nosotros/Nosotros"; 
import Consulta from "./pages/client/consulta/Consulta";

/* Páginas admin */
import Login from "./pages/admin/auth/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Slider from "./pages/admin/slider/Slider";
import Home_secciones from "./pages/admin/home_secciones/Home_secciones";
import Ranking from "./components/admin/home_secciones/Ranking";
import Ofertas from "./components/admin/home_secciones/Ofertas";
import Experiencia from "./components/admin/home_secciones/Experiencia";

import Inventarios from "./pages/admin/inventarios/Inventarios";
import GestionInventarioMoto from "./components/admin/inventarios/motos/GestionInventarioMoto";
import Inventario from "./pages/admin/inventario/Inventario";
import Ventas from "./pages/admin/ventas/Ventas";
import Reportes from "./pages/admin/reportes/Reportes";
import Clientes from "./pages/admin/clientes/Clientes";
import Modelos from "./pages/client/modelos/Modelos";
import ModeloDetalle from "./pages/client/modelos/ModeloDetalle";
import Repuestos from "./pages/client/repuestos/Repuestos";





function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas cliente */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/modelos" element={<Modelos />} />
            <Route path="/modelos/:id" element={<ModeloDetalle />} />
            <Route path="/repuestos" element={<Repuestos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/consulta" element={<Consulta />} />
          </Route>

          {/* Login admin */}
          <Route path="/login/admin" element={<Login />} />

          {/* Rutas admin protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="slider_gestion" element={<Slider />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="reportes" element={<Reportes />} />

            {/* Home secciones como padre */}
            <Route path="home_secciones" element={<Home_secciones />}>
              <Route path="ranking" element={<Ranking />} />
              <Route path="ofertas" element={<Ofertas />} />
              <Route path="experiencia" element={<Experiencia />} />
            </Route>

            {/* Inventarios como padre */}
            <Route path="inventarios" element={<Inventarios />} >
              <Route path="gestion_motos" element={<GestionInventarioMoto />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
