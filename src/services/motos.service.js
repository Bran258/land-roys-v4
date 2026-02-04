import { supabase } from "../api/Supabase.provider";

export const getMotos = async () => {
  const { data, error } = await supabase
    .from("motos")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) throw error;
  return data;
};

export const getMotoById = async (id) => {
  const { data, error } = await supabase
    .from("motos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getTotalUnidadesMotos = async () => {
  const { data, error } = await supabase
    .from("motos")
    .select("stock");

  if (error) throw error;

  const total = data.reduce((acc, moto) => acc + moto.stock, 0);
  return total;
};