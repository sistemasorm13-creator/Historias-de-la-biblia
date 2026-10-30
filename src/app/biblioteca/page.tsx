"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import {
  Globe,
  Waves,
  Music,
  Scroll,
  BookOpen,
  Sword,
  Shield,
  Crown,
  Heart,
  Sun,
  Flame,
  Star,
  Search,
  Filter,
} from "lucide-react";

export default function BibliotecaPage() {
  const [testament, setTestament] = useState<"ALL" | "OT" | "NT">("ALL");
  const [category, setCategory] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const res = await fetch("/api/books");
        const data = await res.json();
        if (data.success) {
          setBooks(data.books);
        }
      } catch (err) {
        console.error("Error loading books:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const categories = [
    "TODOS",
    "Pentateuco",
    "Históricos",
    "Poéticos",
    "Profetas Mayores",
    "Profetas Menores",
    "Evangelios",
    "Hechos",
    "Cartas",
    "Apocalipsis",
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "globe":
        return Globe;
      case "waves":
        return Waves;
      case "harp":
        return Music;
      case "scroll":
        return Scroll;
      case "sword":
        return Sword;
      case "shield":
        return Shield;
      case "crown":
        return Crown;
      case "heart":
        return Heart;
      case "sun":
        return Sun;
      case "flame":
        return Flame;
      case "star":
        return Star;
      default:
        return BookOpen;
    }
  };

  const filteredBooks = books.filter((b) => {
    if (testament === "OT" && b.testament !== "OT") return false;
    if (testament === "NT" && b.testament !== "NT") return false;
    if (category !== "TODOS" && b.category.toLowerCase() !== category.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q);
    }
    return true;
  });

  const otCount = books.filter((b) => b.testament === "OT").length;
  const ntCount = books.filter((b) => b.testament === "NT").length;

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* HEADER TITLE BANNER */}
        <div className="bg-[#24170F] border border-[#352317] rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#F5D17A] bg-[#352317] px-3.5 py-1.5 rounded-full border border-[#D4A64A]/30 tracking-widest uppercase">
              Colección Bíblica Completa
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#F8F2E8]">
              Biblioteca de las Sagradas Escrituras
            </h1>
            <p className="text-sm md:text-base text-[#B8AA9A]">
              Explora los 66 libros inspirados del Antiguo y Nuevo Testamento con contexto histórico, capítulos e historias ilustradas.
            </p>
          </div>
        </div>

        {/* TESTAMENT TABS & SEARCH BAR */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Testament Switch */}
            <div className="flex items-center bg-[#24170F] p-1.5 rounded-2xl border border-[#352317] w-fit">
              <button
                onClick={() => setTestament("ALL")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  testament === "ALL"
                    ? "bg-[#D4A64A] text-black shadow-md"
                    : "text-[#B8AA9A] hover:text-white"
                }`}
              >
                Todos los Libros ({books.length})
              </button>

              <button
                onClick={() => setTestament("OT")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  testament === "OT"
                    ? "bg-[#D4A64A] text-black shadow-md"
                    : "text-[#B8AA9A] hover:text-white"
                }`}
              >
                Antiguo Testamento ({otCount})
              </button>

              <button
                onClick={() => setTestament("NT")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  testament === "NT"
                    ? "bg-[#D4A64A] text-black shadow-md"
                    : "text-[#B8AA9A] hover:text-white"
                }`}
              >
                Nuevo Testamento ({ntCount})
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8AA9A]" />
              <input
                type="text"
                placeholder="Buscar libro bíblico..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#24170F] border border-[#352317] focus:border-[#D4A64A] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F8F2E8] placeholder-[#B8AA9A]/60 outline-none"
              />
            </div>
          </div>

          {/* CATEGORIES PILLS */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? "bg-[#D4A64A] text-black font-bold shadow-md"
                    : "bg-[#24170F] text-[#B8AA9A] border border-[#352317] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BOOKS GRID */}
        {loading ? (
          <div className="text-center py-20 text-[#D4A64A]">Cargando biblioteca...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => {
              const IconComp = getIcon(book.iconType);
              return (
                <Link
                  key={book.slug}
                  href={`/biblioteca/${book.slug}`}
                  className="biblical-card p-5 flex flex-col justify-between group hover:border-[#D4A64A] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#24170F] border border-[#D4A64A]/40 flex items-center justify-center text-[#F5D17A] group-hover:bg-[#D4A64A] group-hover:text-black transition-colors flex-shrink-0 shadow-inner">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#D4A64A] bg-[#24170F] px-2 py-0.5 rounded border border-[#352317]">
                          {book.testament === "OT" ? "A.T." : "N.T."} • {book.category}
                        </span>
                        <span className="text-[10px] text-[#B8AA9A]">
                          {book.chaptersCount} capítulos
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#F8F2E8] group-hover:text-[#F5D17A] mt-1 truncate">
                        {book.name}
                      </h3>
                      <p className="text-xs text-[#B8AA9A] line-clamp-2 mt-1">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#352317]/60 flex items-center justify-between text-xs text-[#D4A64A]">
                    <span>Autor: {book.author}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Ver historias →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
