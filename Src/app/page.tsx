"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import FeaturedCard from "@/components/FeaturedCard";
import BooksCarousel from "@/components/BooksCarousel";
import StoryCard from "@/components/StoryCard";
import { Sparkles, HeartHandshake, Compass, Shield, Flame, BookOpen, Search } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [featuredStory, setFeaturedStory] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);

        // Fetch Books
        const booksRes = await fetch("/api/books");
        const booksData = await booksRes.json();
        if (booksData.success) {
          setBooks(booksData.books);
        }

        // Fetch Stories
        const storiesRes = await fetch(
          `/api/stories?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(
            selectedCategory
          )}`
        );
        const storiesData = await storiesRes.json();
        if (storiesData.success) {
          setStories(storiesData.stories);
          const feat = storiesData.stories.find((s: any) => s.featured) || storiesData.stories[0];
          setFeaturedStory(feat);
        }
      } catch (err) {
        console.error("Error loading home data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [searchQuery, selectedCategory]);

  const themes = [
    { name: "Ansiedad", icon: "🕊️", query: "Ansiedad" },
    { name: "Esperanza", icon: "🌅", query: "Esperanza" },
    { name: "Paciencia", icon: "⌛", query: "Paciencia" },
    { name: "Perdón", icon: "❤️", query: "Perdón" },
    { name: "Gratitud", icon: "✨", query: "Gratitud" },
    { name: "Sabiduría", icon: "👑", query: "Sabiduría" },
    { name: "Fe", icon: "🛡️", query: "Fe" },
    { name: "Valentía", icon: "⚔️", query: "Valentía" },
  ];

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      {/* Navigation Header */}
      <Navigation
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-8 space-y-8">
        {/* TOP DESKTOP SEARCH BAR IF NOT MOBILE */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-[#24170F] border border-[#352317] rounded-2xl p-3 shadow-md">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8AA9A]" />
            <input
              type="text"
              placeholder="Buscar historias, libros, personajes o pasajes bíblicos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-12 pr-4 py-2 text-sm text-[#F8F2E8] placeholder-[#B8AA9A]/60 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {["Todos", "Antiguo Testamento", "Nuevo Testamento", "Parábolas"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#D4A64A] text-[#120D09] shadow-md shadow-[#D4A64A]/30"
                    : "bg-[#352317] text-[#B8AA9A] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#D4A64A] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#D4A64A] font-serif">Cargando la biblioteca digital...</p>
          </div>
        ) : (
          <>
            {/* FEATURED STORY CARD ("Destacado del Día") */}
            {featuredStory && !searchQuery && selectedCategory === "Todos" && (
              <section className="space-y-3">
                <FeaturedCard story={featuredStory} />
              </section>
            )}

            {/* LIBROS DE LA BIBLIA CAROUSEL */}
            {books.length > 0 && !searchQuery && (
              <section>
                <BooksCarousel books={books.slice(0, 12)} />
              </section>
            )}

            {/* WHAT DO YOU WANT TO LEARN TODAY? ("¿Qué deseas aprender hoy?") */}
            {!searchQuery && (
              <section className="space-y-3 bg-[#24170F]/60 border border-[#352317] p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-[#F8F2E8]">
                      ¿Qué deseas aprender hoy?
                    </h3>
                    <p className="text-xs text-[#B8AA9A] mt-0.5">
                      Encuentra paz e inspiración según tu estado espiritual
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#F5D17A]" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {themes.map((t) => (
                    <Link
                      key={t.name}
                      href={`/descubrir?theme=${encodeURIComponent(t.name)}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#352317]/80 border border-[#D4A64A]/20 hover:border-[#D4A64A] hover:bg-[#352317] transition-all group"
                    >
                      <span className="text-lg group-hover:scale-125 transition-transform">
                        {t.icon}
                      </span>
                      <span className="text-xs font-semibold text-[#F8F2E8] group-hover:text-[#F5D17A]">
                        {t.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* HISTORIAS POPULARES / LIST */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#F8F2E8]">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : selectedCategory !== "Todos"
                    ? `Historias de ${selectedCategory}`
                    : "Historias Populares"}
                </h3>
                <span className="text-xs text-[#D4A64A] font-semibold bg-[#24170F] px-3 py-1 rounded-full border border-[#352317]">
                  {stories.length} historias
                </span>
              </div>

              {stories.length === 0 ? (
                <div className="text-center py-12 bg-[#24170F]/40 border border-[#352317] rounded-2xl p-6">
                  <p className="text-[#B8AA9A] text-sm">
                    No se encontraron historias con los criterios seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Todos");
                    }}
                    className="mt-3 btn-gold-outline px-4 py-2 rounded-xl text-xs"
                  >
                    Ver todas las historias
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
