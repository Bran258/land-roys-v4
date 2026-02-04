import { useState, useEffect } from "react";
import { getMotos } from "../services/motos.service";

export const useMotos = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const data = await getMotos();
        setMotos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotos();
  }, []);

  return { motos, loading };
};
