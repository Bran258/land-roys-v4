import { supabase } from '../api/Supabase.provider';

// Nombre del bucket existente
const BLOG_BUCKET = import.meta.env.VITE_SUPABASE_RANKING_BUCKET || "ranking_3";

// Utilidad para generar slugs a partir del título
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .normalize("NFD") // Elimina tildes
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-') // Reemplaza espacios y caracteres raros por guiones
        .replace(/^-+|-+$/g, ''); // Elimina guiones al principio o final
};

export const BlogService = {
    // Obtener todos los posts (para el panel de admin)
    async getAllPosts() {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching all posts:', error);
            throw error;
        }
    },

    // Obtener solo posts publicados (para la vista de cliente) con paginación
    async getPublishedPosts(from = 0, to = 9) {
        try {
            const { data, error, count } = await supabase
                .from('blog_posts')
                .select('*', { count: 'exact' })
                .eq('is_published', true)
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;
            return { data, count }; // Retornamos los datos y el total de posts
        } catch (error) {
            console.error('Error fetching published posts:', error);
            throw error;
        }
    },

    // Obtener un post por ID (usado por Admin)
    async getPostById(id) {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            throw error;
        }
    },

    // ======== MANEJO DE IMÁGENES ========

    // Subir imagen para portada o hero
    async uploadImage(file, isHero = false) {
        if (!file) return null;

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = isHero ? `hero_main_${Date.now()}.${fileExt}` : `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `blog/${isHero ? 'hero' : 'covers'}/${fileName}`;

            const { error } = await supabase.storage
                .from(BLOG_BUCKET)
                .upload(filePath, file, { cacheControl: "3600", upsert: true });

            if (error) throw error;

            const { data: publicData } = supabase.storage
                .from(BLOG_BUCKET)
                .getPublicUrl(filePath);

            return publicData.publicUrl;
        } catch (err) {
            console.error("Error al subir imagen:", err);
            throw err;
        }
    },

    // Obtener y cambiar el hero es básicamente guardar un post especial o solo usar la última imagen subida a config.
    // Como no hay tabla de config, usaremos localhost o buscaremos si podemos crear un post dummy "config-hero"
    async getHeroImage() {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('cover_image')
                .eq('slug', 'config-hero-image-system')
                .single();
            if (error) return null;
            return data.cover_image;
        } catch {
            return null;
        }
    },

    async setHeroImage(url) {
        try {
            // Verificar si el dummy de hero existe
            const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', 'config-hero-image-system').single();

            if (existing) {
                await supabase.from('blog_posts').update({ cover_image: url }).eq('id', existing.id);
            } else {
                await supabase.from('blog_posts').insert([{
                    title: 'System Config Hero',
                    slug: 'config-hero-image-system',
                    category: 'System',
                    content: 'No borrar',
                    cover_image: url,
                    is_published: false
                }]);
            }
            return url;
        } catch (err) {
            console.error("Error setHeroImage:", err);
            throw err;
        }
    },

    // Obtener un post por slug (usado por Cliente para SEO)
    async getPostBySlug(slug) {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error fetching post with slug ${slug}:`, error);
            throw error;
        }
    },

    // Crear un post
    async createPost(postData) {
        try {
            // Generar slug si no viene uno o si es crear
            const slug = postData.slug || generateSlug(postData.title);

            // Check si el slug existe (agregar sufijo aleatorio dsi ya existe para no fallar)
            const { data: existingPost } = await supabase.from('blog_posts').select('id').eq('slug', slug).single();
            const finalSlug = existingPost ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug;

            const { data, error } = await supabase
                .from('blog_posts')
                .insert([{ ...postData, slug: finalSlug }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Actualizar un post
    async updatePost(id, postData) {
        try {
            // Generar o usar el slug provisto
            let finalSlug = postData.slug || generateSlug(postData.title);

            // TODO: Podríamos chequear unicidad si el título cambió mucho, pero por simplicidad de admin lo omitiremos aquí 
            // a menos que dé error Unique Constraint.

            const { data, error } = await supabase
                .from('blog_posts')
                .update({
                    ...postData,
                    slug: finalSlug,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error updating post ${id}:`, error);
            throw error;
        }
    },

    // Eliminar un post
    async deletePost(id) {
        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error(`Error deleting post ${id}:`, error);
            throw error;
        }
    }
};
