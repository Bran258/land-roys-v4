// src/services/usuario.service.js
import { supabase } from "../api/Supabase.provider";

/**
 * Obtiene los roles de un usuario según su correo
 * @param {string} email - Correo del usuario
 * @returns {Promise<string[]>} - Lista de roles del usuario
 */
export const getUserRoles = async (email) => {
  try {
    // 1️⃣ Obtener usuario por email
    const { data: userData, error: userError } = await supabase
      .from("usuario")
      .select("id_usuario")
      .eq("email", email)
      .single();

    if (userError) throw userError;
    if (!userData) return [];

    const userId = userData.id_usuario;

    // 2️⃣ Obtener roles del usuario usando join
    const { data: rolesData, error: rolesError } = await supabase
      .from("usuario_rol")
      .select("rols:rol(nombre_rol)") // 'rols' es el alias, 'rol' es la relación con la tabla rol
      .eq("id_usuario", userId);

    if (rolesError) throw rolesError;
    if (!rolesData) return [];

    // 3️⃣ Extraer solo nombres de roles
    const roles = rolesData.map((r) => r.rols?.nombre_rol).filter(Boolean);

    return roles;
  } catch (err) {
    console.error("Error obteniendo roles:", err);
    return [];
  }
};
