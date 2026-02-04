import { useState, useEffect } from "react";
import { getOfertas, createOferta, updateOferta, deleteOferta } from "../services/ofertas.service";

export const useOfertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfertas();
  }, []);

  const fetchOfertas = async () => {
    try {
      const data = await getOfertas();
      setOfertas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addOferta = async (oferta) => {
    const data = await createOferta(oferta);
    setOfertas([data[0], ...ofertas]);
  };

  const editOferta = async (id, oferta) => {
    const data = await updateOferta(id, oferta);
    setOfertas(ofertas.map((o) => (o.id === id ? data[0] : o)));
  };

  const removeOferta = async (id) => {
    await deleteOferta(id);
    setOfertas(ofertas.filter((o) => o.id !== id));
  };

  return { ofertas, loading, addOferta, editOferta, removeOferta, fetchOfertas };
};
