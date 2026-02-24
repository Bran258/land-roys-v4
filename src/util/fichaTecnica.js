const isValidHttpUrl = (value) => {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const resolveFichaTecnicaUrl = (moto = {}) => {
  if (isValidHttpUrl(moto.ficha_tecnica_url)) return moto.ficha_tecnica_url;

  const base = import.meta.env.VITE_FICHA_TECNICA_BASE_URL;
  const code = (moto.modelo_codigo || moto.nombre || "").toString().trim();

  if (!base || !code) return "";

  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const slug = code.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
  if (!slug) return "";

  return `${normalizedBase}/${slug}.pdf`;
};
