// src/services/ofertas.public.service.js
import { supabase } from "../api/Supabase.provider";

export const getOfertasPublicas = async () => {
  const { data, error } = await supabase
    .from("ofertas")
    .select(`
      id,
      titulo,
      descripcion,
      textoboton,
      imagen_url,
      descuento,
      expiracion,
      precio_original,
      precio_especial,
      moto_seleccionada
    `)
    .order("creado_en", { ascending: false });

  if (error) throw error;
  return data;
};
