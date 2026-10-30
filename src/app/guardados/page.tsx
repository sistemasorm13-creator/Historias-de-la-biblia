"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import StoryCard from "@/components/StoryCard";
import { useUser } from "@/components/UserContext";
import { Bookmark, Search, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuardadosPage() {
  const { user } = useUser();
  const [savedStories, setSavedStories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/saved?userId=${user?.id || "user-demo"}`);
      const data = await res.json();
      if (data.success) {
        setSavedStories(data.saved);
      }
    } catch (e) {
      console.error("Error fetching saved stories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, [user?.id]);

  const filtered = savedStories.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.chapterReference.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* BANNER */}
        <div className="bg-[#24170F] border border-[#352317] rounded-3xl p-6 md:p-10 flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#F5D17A] bg-[#352317] px-3.5 py-1.5 rounded-full border border-[#D4A64A]/30 uppercase tracking-widest">
              Colección Personal
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#F8F2E8]">
              Historias Guardadas
            </h1>
            <p className="text-xs md:text-sm text-[#B8AA9A]">
              Accede a tus pasajes y relatos bíblicos favoritos en cualquier momento.
            </p>
          </div>
          <Bookmark className="w-16 h-16 text-[#D4A64A]/40 hidden sm:block fill-[#D4A64A]/20" />
        </div>

        {/* SEARCH BAR & COUNT */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8AA9A]" />
            <input
              type="text"
              placeholder="Buscar en tus guardados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#24170F] border border-[#352317] focus:border-[#D4A64A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F8F2E8] placeholder-[#B8AA9A]/60 outline-none"
            />
          </div>

          <span className="text-xs text-[#D4A64A] font-semibold bg-[#24170F] px-4 py-2 rounded-xl border border-[#352317] w-fit">
            {savedStories.length} Historias Guardadas
          </span>
        </div>

        {/* SAVED STORIES LIST */}
        {loading ? (
          <div className="text-center py-12 text-[#D4A64A]">Cargando favoritos...</div>
        ) : filtered.length === 0 ? (
          <div className="biblical-card p-12 text-center space-y-4">
            <Bookmark className="w-12 h-12 text-[#B8AA9A] mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-[#F8F2E8]">
              {searchQuery ? "No hay coincidencias en tus guardados" : "No tienes historias guardadas aún"}
            </h3>
            <p className="text-xs text-[#B8AA9A] max-w-md mx-auto">
              Explora las historias de la Biblia y toca el icono del marcador para guardarlas aquí.
            </p>
            <Link href="/" className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold">
              Explorar Historias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
