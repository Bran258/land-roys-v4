// services/rankingHome.service.js
import { supabase } from "../api/Supabase.provider";

// ===============================
// Obtener ranking público
// ===============================
export const getRankingHomePublic = async () => {
  const { data, error } = await supabase
    .from("ranking_home")
    .select("*")
    .eq("activo", true)     // solo productos activos
    .order("rank", { ascending: true });

  if (error) {
    console.error("Error al obtener ranking público:", error);
    return [];
  }

  return data;
};

// ===============================
// Guardar ranking (solo admin o asistente)
// ===============================
export const saveRankingHome = async (productos, userRole) => {
  if (!["admin", "asistente"].includes(userRole)) {
    throw new Error("Permisos insuficientes para guardar ranking");
  }

  // Preparar datos para UPSERT
  const payload = productos.map((p) => ({
    id: p.id,
    rank: p.rank,
    tag: p.tag,
    name: p.name,
    description: p.desc,
    price: p.price,
    image_url: p.image,
    btn_primary_url: p.btn_primary_url,
    activo: true,
    updated_at: new Date().toISOString(),
  }));

  // Inserta o actualiza según id
  const { data, error } = await supabase
    .from("ranking_home")
    .upsert(payload, { onConflict: ["id"] });

  if (error) {
    console.error("Error guardando ranking_home:", error);
    throw error;
  }

  return data;
};
