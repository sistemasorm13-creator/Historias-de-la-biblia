"use client";

import React, { useState, useEffect, use } from "react";
import Navigation from "@/components/Navigation";
import StoryCard from "@/components/StoryCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, User, Clock, Layers, Sparkles } from "lucide-react";

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    async function loadBookData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/books/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBook(data.book);
          setStories(data.stories);
        } else {
          router.push("/biblioteca");
        }
      } catch (err) {
        console.error("Error loading book detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D09] flex flex-col items-center justify-center text-[#D4A64A]">
        <div className="w-12 h-12 border-4 border-[#D4A64A] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif mt-4">Cargando libro bíblico...</p>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-[#B8AA9A] hover:text-[#F5D17A] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Biblioteca</span>
        </button>

        {/* BOOK BANNER */}
        <div className="bg-[#24170F] border border-[#D4A64A]/30 rounded-3xl p-6 md:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold bg-[#D4A64A] text-black px-3 py-1 rounded-full">
              {book.testament === "OT" ? "Antiguo Testamento" : "Nuevo Testamento"}
            </span>
            <span className="text-xs font-medium text-[#F5D17A] bg-[#352317] px-3 py-1 rounded-full border border-[#D4A64A]/30">
              {book.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#F8F2E8]">
            Libro de {book.name}
          </h1>

          <p className="text-sm md:text-base text-[#B8AA9A] max-w-3xl leading-relaxed">
            {book.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#352317]">
            <div className="flex items-center gap-2 text-xs text-[#B8AA9A]">
              <User className="w-4 h-4 text-[#D4A64A]" />
              <span>Autor: <strong className="text-[#F8F2E8]">{book.author}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#B8AA9A]">
              <BookOpen className="w-4 h-4 text-[#D4A64A]" />
              <span>Capítulos: <strong className="text-[#F8F2E8]">{book.chaptersCount}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#B8AA9A]">
              <Clock className="w-4 h-4 text-[#D4A64A]" />
              <span>Contexto: <strong className="text-[#F8F2E8]">{book.historicalContext}</strong></span>
            </div>
          </div>
        </div>

        {/* CHAPTER EXPLORER GRID */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">
            Explorador de Capítulos ({book.chaptersCount})
          </h3>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {Array.from({ length: book.chaptersCount }, (_, i) => i + 1).map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedCategory(selectedChapter === ch ? null : ch)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 ${
                  selectedChapter === ch
                    ? "bg-[#D4A64A] text-black shadow-md scale-110"
                    : "bg-[#24170F] text-[#B8AA9A] border border-[#352317] hover:border-[#D4A64A]"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* RELATED STORIES IN THIS BOOK */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">
            Historias destacadas en {book.name}
          </h3>

          {stories.length === 0 ? (
            <div className="biblical-card p-6 text-center text-[#B8AA9A] text-sm">
              No hay historias registradas directamente para este libro aún.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
