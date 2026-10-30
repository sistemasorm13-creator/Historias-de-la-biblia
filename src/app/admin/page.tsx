"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Shield, Plus, Trash2, Edit, BookOpen, Layers, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPanelPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    chapterReference: "Génesis 1",
    readingTimeMinutes: 5,
    category: "Historias Populares",
    emotionalTheme: "Fe",
    imageUrl: "/images/david-goliath.jpg",
    narrativeContent: "",
    literalContent: "",
    featured: false,
    bookId: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const sRes = await fetch("/api/stories");
      const sData = await sRes.json();
      if (sData.success) setStories(sData.stories);

      const bRes = await fetch("/api/books");
      const bData = await bRes.json();
      if (bData.success) setBooks(bData.books);
    } catch (e) {
      console.error(e);
    } fontFinally: {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("¡Historia creada correctamente en la base de datos!");
        setShowForm(false);
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          chapterReference: "Génesis 1",
          readingTimeMinutes: 5,
          category: "Historias Populares",
          emotionalTheme: "Fe",
          imageUrl: "/images/david-goliath.jpg",
          narrativeContent: "",
          literalContent: "",
          featured: false,
          bookId: 1,
        });
        fetchData();
      } else {
        setErrorMsg(data.error || "Error al crear la historia");
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta historia bíblica?")) return;
    try {
      const res = await fetch(`/api/stories/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Historia eliminada.");
        fetchData();
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* ADMIN HEADER BANNER */}
        <div className="bg-[#24170F] border border-[#D4A64A]/30 rounded-3xl p-6 md:p-8 flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#F5D17A] bg-[#352317] px-3.5 py-1.5 rounded-full border border-[#D4A64A]/30 uppercase tracking-widest flex items-center gap-1.5 w-fit">
              <Shield className="w-3.5 h-3.5 text-[#D4A64A]" />
              Gestión de Contenido Bíblico
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#F8F2E8]">
              Panel de Administración
            </h1>
            <p className="text-xs md:text-sm text-[#B8AA9A]">
              Agrega, edita y administra las historias, libros e ilustraciones del sistema.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-gold px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>{showForm ? "Cerrar Formulario" : "Nueva Historia"}</span>
          </button>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-green-950/80 border border-green-500 text-green-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="biblical-card p-5 text-center">
            <div className="text-3xl font-bold font-serif text-[#F5D17A]">{stories.length}</div>
            <div className="text-xs text-[#B8AA9A] mt-1">Historias Publicadas</div>
          </div>

          <div className="biblical-card p-5 text-center">
            <div className="text-3xl font-bold font-serif text-[#F5D17A]">{books.length}</div>
            <div className="text-xs text-[#B8AA9A] mt-1">Libros Bíblicos</div>
          </div>

          <div className="biblical-card p-5 text-center">
            <div className="text-3xl font-bold font-serif text-[#F5D17A]">39 OT / 27 NT</div>
            <div className="text-xs text-[#B8AA9A] mt-1">Cánones Protestantes</div>
          </div>
        </div>

        {/* ADD STORY FORM */}
        {showForm && (
          <form onSubmit={handleSubmit} className="biblical-card p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#F5D17A]">Crear Nueva Historia Bíblica</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Título</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: David y Goliat"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Referencia Bíblica</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1 Samuel 17"
                  value={formData.chapterReference}
                  onChange={(e) => setFormData({ ...formData, chapterReference: e.target.value })}
                  className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Categoría</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Tiempo de Lectura (Minutos)</label>
                <input
                  type="number"
                  value={formData.readingTimeMinutes}
                  onChange={(e) => setFormData({ ...formData, readingTimeMinutes: Number(e.target.value) })}
                  className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Descripción Breve</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Adaptación Narrativa (Texto Completo)</label>
              <textarea
                rows={6}
                required
                value={formData.narrativeContent}
                onChange={(e) => setFormData({ ...formData, narrativeContent: e.target.value })}
                className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Cita Bíblica Literal (RVR 1909 - Dominio Público)</label>
              <textarea
                rows={4}
                value={formData.literalContent}
                onChange={(e) => setFormData({ ...formData, literalContent: e.target.value })}
                className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2.5 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="feat"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="accent-[#D4A64A]"
              />
              <label htmlFor="feat" className="text-xs font-bold text-[#F5D17A]">
                Marcar como Destacado del Día
              </label>
            </div>

            <button type="submit" className="btn-gold px-8 py-3 rounded-xl text-xs font-bold shadow-lg">
              Publicar Historia Bíblica
            </button>
          </form>
        )}

        {/* EXISTING STORIES TABLE/LIST */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">Historias Existentes</h3>

          <div className="space-y-3">
            {stories.map((s) => (
              <div key={s.id} className="biblical-card p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#F8F2E8]">{s.title}</h4>
                    {s.featured && (
                      <span className="bg-[#D4A64A] text-black text-[9px] font-bold px-2 py-0.5 rounded">
                        DESTACADO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#D4A64A]">{s.chapterReference} • {s.category}</p>
                </div>

                <button
                  onClick={() => handleDelete(s.slug)}
                  className="p-2 text-[#B8AA9A] hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-all"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
