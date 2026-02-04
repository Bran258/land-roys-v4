// services/uploadService.js
import { supabase } from "../api/Supabase.provider";

export const subirImagen = async (file) => {
  if (!file) return null;

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `ranking_3/${fileName}`;

    // Subir archivo
    const { data, error } = await supabase.storage
      .from("ranking_3")
      .upload(filePath, file);

    if (error) {
      console.error("Error al subir la imagen:", error.message);
      return null;
    }

    // Obtener URL pública
    const { data: publicData, error: urlError } = supabase.storage
      .from("ranking_3")
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error al obtener la URL pública:", urlError.message);
      return null;
    }

    return publicData.publicUrl;
  } catch (err) {
    console.error("Error inesperado al subir la imagen:", err);
    return null;
  }
};
