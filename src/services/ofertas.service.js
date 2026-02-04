import { supabase } from "../api/Supabase.provider";

export const getOfertas = async () => {
  const { data, error } = await supabase
    .from("ofertas")
    .select("*")
    .order("creado_en", { ascending: false });
  if (error) throw error;
  return data;
};

export const createOferta = async (oferta) => {
  const { data, error } = await supabase
    .from("ofertas")
    .insert([oferta])
    .select();
  if (error) throw error;
  return data;
};

export const updateOferta = async (id, oferta) => {
  const { data, error } = await supabase
    .from("ofertas")
    .update(oferta)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
};

export const deleteOferta = async (id) => {
  const { error } = await supabase.from("ofertas").delete().eq("id", id);
  if (error) throw error;
};
