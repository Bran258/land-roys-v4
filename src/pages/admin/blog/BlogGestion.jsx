import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, Image as ImageIcon, Upload } from 'lucide-react';
import { BlogService } from '../../../services/Blog.service';
import Swal from 'sweetalert2';

const BlogGestion = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    const [heroImage, setHeroImage] = useState('');
    const [uploadingHero, setUploadingHero] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const heroFileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Noticias',
        excerpt: '',
        content: '',
        cover_image: '',
        is_published: true
    });

    const categorias = ['Noticias', 'Eventos', 'Tips & Guías', 'Mantenimiento'];

    useEffect(() => {
        fetchPosts();
        fetchHeroImage();
    }, []);

    const fetchHeroImage = async () => {
        const url = await BlogService.getHeroImage();
        if (url) setHeroImage(url);
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await BlogService.getAllPosts();
            setPosts(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los posts', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (post = null) => {
        if (post) {
            setCurrentPost(post);
            setFormData({
                title: post.title,
                slug: post.slug || '',
                category: post.category,
                excerpt: post.excerpt || '',
                content: post.content || '',
                cover_image: post.cover_image || '',
                is_published: post.is_published
            });
        } else {
            setCurrentPost(null);
            setFormData({
                title: '',
                slug: '',
                category: 'Noticias',
                excerpt: '',
                content: '',
                cover_image: '',
                is_published: true
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPost(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            Swal.fire('Atención', 'El título y contenido son obligatorios', 'warning');
            return;
        }

        try {
            if (currentPost) {
                await BlogService.updatePost(currentPost.id, formData);
                Swal.fire('Éxito', 'Post actualizado correctamente', 'success');
            } else {
                await BlogService.createPost(formData);
                Swal.fire('Éxito', 'Post creado correctamente', 'success');
            }
            handleCloseModal();
            fetchPosts();
        } catch {
            Swal.fire('Error', 'Hubo un problema al guardar el post', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await BlogService.deletePost(id);
                Swal.fire('Eliminado!', 'El post ha sido eliminado.', 'success');
                fetchPosts();
            } catch {
                Swal.fire('Error', 'Hubo un problema al eliminar el post', 'error');
            }
        }
    };

    const handleHeroImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingHero(true);
        try {
            const url = await BlogService.uploadImage(file, true);
            await BlogService.setHeroImage(url);
            setHeroImage(url);
            Swal.fire('Éxito', 'Imagen principal (Hero) actualizada', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar la imagen principal', 'error');
        } finally {
            setUploadingHero(false);
            if (heroFileInputRef.current) heroFileInputRef.current.value = '';
        }
    };

    const handleCoverImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingCover(true);
        try {
            const url = await BlogService.uploadImage(file, false);
            setFormData(prev => ({ ...prev, cover_image: url }));
        } catch (error) {
            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        } finally {
            setUploadingCover(false);
            if (coverFileInputRef.current) coverFileInputRef.current.value = '';
        }
    };

    // Filter posts
    const filteredPosts = posts.filter(post =>
        post.slug !== 'config-hero-image-system' &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-dark">Gestión de Blog</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Nuevo Post
                </button>
            </div>

            {/* Configuración del Hero Image */}
            <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl mb-6 flex flex-col md:flex-row items-center gap-6 border border-slate-200 dark:border-gray-800 shadow-sm">
                <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Imagen Principal del Blog</h2>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Esta es la imagen de fondo que aparece en la parte superior de la página principal del blog.</p>
                    <div className="flex gap-4 mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            ref={heroFileInputRef}
                            onChange={handleHeroImageChange}
                            className="hidden"
                        />
                        <button
                            onClick={() => heroFileInputRef.current?.click()}
                            disabled={uploadingHero}
                            className="bg-slate-800 hover:bg-slate-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <Upload size={18} />
                            {uploadingHero ? 'Subiendo...' : 'Subir Nueva Imagen'}
                        </button>
                    </div>
                </div>
                {heroImage && (
                    <div className="w-full md:w-64 h-32 rounded-lg border border-gray-700 overflow-hidden shrink-0">
                        <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Buscador */}
            <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl mb-6 border border-slate-200 dark:border-gray-800 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título o categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-white border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-yellow-400"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-200 dark:border-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-700 dark:text-gray-300">
                        <thead className="bg-slate-100 dark:bg-[#2d2d2d] text-slate-900 dark:text-gray-100 uppercase text-xs border-b border-slate-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Portada</th>
                                <th className="px-6 py-4 font-semibold">Título</th>
                                <th className="px-6 py-4 font-semibold">Categoría</th>
                                <th className="px-6 py-4 font-semibold">Estado</th>
                                <th className="px-6 py-4 font-semibold">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400 dark:text-gray-400">
                                        Cargando posts...
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400 dark:text-gray-400">
                                        No se encontraron posts
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map(post => (
                                    <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors">
                                        <td className="px-6 py-4">
                                            {post.cover_image ? (
                                                <img src={post.cover_image} alt={post.title} className="w-16 h-10 object-cover rounded" />
                                            ) : (
                                                <div className="w-16 h-10 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center">
                                                    <ImageIcon size={16} className="text-slate-400 dark:text-gray-500" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-[200px] truncate" title={post.title}>
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 dark:bg-[#2d2d2d] text-yellow-600 dark:text-yellow-500 px-2 py-1 rounded text-xs font-medium">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${post.is_published ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {post.is_published ? 'Publicado' : 'Borrador'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(post)}
                                                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-400/10 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Crear/Editar */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1e1e1e] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
                        <div className="sticky top-0 bg-[#1e1e1e] p-6 border-b border-gray-800 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-white">
                                {currentPost ? 'Editar Post' : 'Nuevo Post'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Título */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Título del Post *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400"
                                        placeholder="Ej: Gran Rodada Nocturna 2024"
                                        required
                                    />
                                </div>

                                {/* Categoría */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Categoría *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-400"
                                        required
                                    >
                                        {categorias.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Slug */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300">Slug (URL amigable)</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 text-sm"
                                        placeholder="Se autogenerará a partir del título si lo dejas en blanco"
                                    />
                                    <p className="text-xs text-gray-500">Ejemplo: gran-rodada-nocturna-2024</p>
                                </div>
                            </div>

                            {/* Imagen URL o File */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Imagen de Portada</label>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="url"
                                                name="cover_image"
                                                value={formData.cover_image}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-yellow-400"
                                                placeholder="https://ejemplo.com/imagen.jpg o sube un archivo"
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={coverFileInputRef}
                                            onChange={handleCoverImageUpload}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => coverFileInputRef.current?.click()}
                                            disabled={uploadingCover}
                                            className="bg-gray-800 hover:bg-gray-700 flex items-center justify-center px-4 rounded-lg text-white transition-colors disabled:opacity-50"
                                            title="Subir Archivo"
                                        >
                                            <Upload size={18} />
                                        </button>
                                        {formData.cover_image && (
                                            <div className="w-12 h-10 rounded border border-gray-700 overflow-hidden shrink-0">
                                                <img src={formData.cover_image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Puedes pegar una URL directamente o hacer clic en el botón para subir una imagen de tu computadora.</p>
                                </div>
                            </div>

                            {/* Resumen */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Resumen (Excerpt)</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 resize-none"
                                    placeholder="Breve descripción que aparecerá en la tarjeta..."
                                ></textarea>
                            </div>

                            {/* Contenido (HTML) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Contenido del Post (Soporta HTML básico) *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    rows="10"
                                    className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 font-mono text-sm"
                                    placeholder="<p>Escribe el contenido aquí...</p>"
                                    required
                                ></textarea>
                            </div>

                            {/* Publicado checkbox */}
                            <div className="flex items-center gap-2 bg-[#121212] p-4 rounded-lg border border-gray-800">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    name="is_published"
                                    checked={formData.is_published}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 accent-yellow-400 bg-gray-700 border-gray-600 rounded cursor-pointer"
                                />
                                <label htmlFor="is_published" className="text-sm font-medium text-gray-300 cursor-pointer select-none">
                                    Publicar inmediatamente (Visible para los usuarios)
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-colors font-bold"
                                >
                                    Guardar Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogGestion;
