"use client";

import React, { useState, useEffect, Suspense } from "react";
import Navigation from "@/components/Navigation";
import StoryCard from "@/components/StoryCard";
import { useSearchParams } from "next/navigation";
import { Compass, Sparkles, Heart, Shield, Sun, Flame, Crown, Star, BookOpen } from "lucide-react";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get("theme") || "";

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { title: "Historias de fe", icon: Shield, key: "Historias de fe" },
    { title: "Historias de esperanza", icon: Sun, key: "Historias de esperanza" },
    { title: "Milagros de Jesús", icon: Sparkles, key: "Milagros de Jesús" },
    { title: "Parábolas", icon: BookOpen, key: "Parábolas" },
    { title: "Historias de amor", icon: Heart, key: "Historias de amor" },
    { title: "Historias de valentía", icon: Flame, key: "Valentía" },
    { title: "Historias de perdón", icon: Heart, key: "Perdón" },
    { title: "Vida de Jesús", icon: Crown, key: "Vida de Jesús" },
  ];

  const emotionalThemes = [
    { name: "Ansiedad", description: "Paz para el corazón preocupado" },
    { name: "Esperanza", description: "Luz en medio de la oscuridad" },
    { name: "Paciencia", description: "Perseverancia en la espera" },
    { name: "Perdón", description: "Sanidad del alma" },
    { name: "Gratitud", description: "Reconocer las bendiciones diarias" },
    { name: "Sabiduría", description: "Discernimiento divino" },
  ];

  useEffect(() => {
    async function loadStories() {
      try {
        setLoading(true);
        let url = `/api/stories?`;
        if (selectedTheme) url += `theme=${encodeURIComponent(selectedTheme)}&`;
        if (selectedCategory !== "TODAS") url += `category=${encodeURIComponent(selectedCategory)}&`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setStories(data.stories);
        }
      } catch (e) {
        console.error("Error fetching discover stories:", e);
      } finally {
        setLoading(false);
      }
    }
    loadStories();
  }, [selectedTheme, selectedCategory]);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">
      {/* BANNER */}
      <div className="bg-[#24170F] border border-[#352317] rounded-3xl p-6 md:p-10 flex items-center justify-between">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-[#F5D17A] bg-[#352317] px-3.5 py-1.5 rounded-full border border-[#D4A64A]/30 tracking-widest uppercase">
            Descubrimiento Espiritual
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#F8F2E8]">
            Descubre Historias Bíblicas
          </h1>
          <p className="text-xs md:text-sm text-[#B8AA9A]">
            Encuentra enseñanza, consuelo y sabiduría organizados por categorías temáticas y necesidades del corazón.
          </p>
        </div>
        <Compass className="w-20 h-20 text-[#D4A64A]/30 hidden sm:block" />
      </div>

      {/* "¿Qué deseas aprender hoy?" THEMES */}
      <section className="space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#F8F2E8] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F5D17A]" />
          <span>¿Qué deseas aprender hoy?</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {emotionalThemes.map((t) => {
            const isSel = selectedTheme === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setSelectedTheme(isSel ? "" : t.name)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSel
                    ? "bg-[#D4A64A] text-black border-[#F5D17A] shadow-lg scale-105"
                    : "bg-[#24170F] text-[#F8F2E8] border-[#352317] hover:border-[#D4A64A]"
                }`}
              >
                <div className="font-bold text-xs">{t.name}</div>
                <div className={`text-[10px] mt-1 ${isSel ? "text-black/80" : "text-[#B8AA9A]"}`}>
                  {t.description}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CATEGORY GRID CARDS */}
      <section className="space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">
          Categorías Destacadas
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedCategory("TODAS")}
            className={`p-4 rounded-2xl border text-center transition-all ${
              selectedCategory === "TODAS"
                ? "bg-[#D4A64A] text-black font-bold border-[#F5D17A]"
                : "bg-[#24170F] text-[#B8AA9A] border-[#352317] hover:text-white"
            }`}
          >
            Todas las Categorías
          </button>

          {categories.map((c) => {
            const IconC = c.icon;
            const isSel = selectedCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(isSel ? "TODAS" : c.key)}
                className={`p-4 rounded-2xl border flex items-center gap-3 text-left transition-all ${
                  isSel
                    ? "bg-[#D4A64A] text-black font-bold border-[#F5D17A]"
                    : "bg-[#24170F] text-[#F8F2E8] border-[#352317] hover:border-[#D4A64A]"
                }`}
              >
                <IconC className={`w-5 h-5 ${isSel ? "text-black" : "text-[#D4A64A]"}`} />
                <span className="text-xs">{c.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* STORIES LIST */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">
            Historias Encontradas ({stories.length})
          </h3>
          {(selectedTheme || selectedCategory !== "TODAS") && (
            <button
              onClick={() => {
                setSelectedTheme("");
                setSelectedCategory("TODAS");
              }}
              className="text-xs text-[#D4A64A] underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#D4A64A]">Buscando historias...</div>
        ) : stories.length === 0 ? (
          <div className="biblical-card p-8 text-center text-[#B8AA9A]">
            No se encontraron historias para esta categoría o tema.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function DescubrirPage() {
  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />
      <Suspense fallback={<div className="p-8 text-[#D4A64A]">Cargando descubrimiento...</div>}>
        <DiscoverContent />
      </Suspense>
    </div>
  );
}
