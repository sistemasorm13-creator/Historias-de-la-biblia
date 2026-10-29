"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { useAudio } from "@/components/AudioContext";
import { useUser } from "@/components/UserContext";
import confetti from "canvas-confetti";
import {
  BookOpen,
  Headphones,
  Bookmark,
  Share2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Type,
  Moon,
  Sun,
  Layers,
  Sparkles,
  ArrowLeft,
  Quote,
} from "lucide-react";

export default function StoryReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { playStory } = useAudio();
  const { savedIds, toggleBookmark, user, refreshUser } = useUser();

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [readingMode, setReadingMode] = useState<"narrative" | "literal" | "interactive">("narrative");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [theme, setTheme] = useState<"dark" | "sepia">("dark");
  const [completed, setCompleted] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  const isSaved = story ? savedIds.includes(story.id) : false;

  useEffect(() => {
    async function fetchStory() {
      try {
        setLoading(true);
        const res = await fetch(`/api/stories/${slug}?userId=${user?.id || "user-demo"}`);
        const data = await res.json();
        if (data.success) {
          setStory(data.story);
          setCompleted(data.story.completed || false);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Error loading story:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [slug, user?.id]);

  const handleListen = () => {
    if (!story) return;
    playStory({
      id: story.id,
      slug: story.slug,
      title: story.title,
      chapterReference: story.chapterReference,
      imageUrl: story.imageUrl,
      readingTimeMinutes: story.readingTimeMinutes,
      narrativeContent: story.narrativeContent,
    });
  };

  const handleBookmark = async () => {
    if (!story) return;
    await toggleBookmark(story.id);
  };

  const handleComplete = async () => {
    if (!story) return;
    const newCompleted = !completed;
    setCompleted(newCompleted);

    // Fire confetti on complete
    if (newCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4A64A", "#F5D17A", "#FFFFFF"],
      });
    }

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "user-demo",
          storyId: story.id,
          progressPercentage: newCompleted ? 100 : 50,
          completed: newCompleted,
        }),
      });
      refreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: `Lee la historia bíblica de "${story.title}" (${story.chapterReference}) en Historias Bíblicas`,
          url: window.location.href,
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-sm leading-relaxed";
      case "lg":
        return "text-lg leading-loose";
      case "xl":
        return "text-xl leading-loose";
      default:
        return "text-base leading-relaxed";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D09] flex flex-col items-center justify-center gap-4 text-[#D4A64A]">
        <div className="w-12 h-12 border-4 border-[#D4A64A] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif">Cargando la historia...</p>
      </div>
    );
  }

  if (!story) return null;

  const scenes = story.scenes || [];

  return (
    <div
      className={`min-h-screen pb-24 md:pb-12 md:pl-64 transition-colors ${
        theme === "sepia" ? "bg-[#1C1712] text-[#F3EAD3]" : "bg-[#120D09] text-[#F8F2E8]"
      }`}
    >
      <Navigation showFilters={false} />

      {/* READER STICKY TOP TOOLBAR */}
      <div className="sticky top-0 z-20 bg-[#120D09]/95 backdrop-blur-md border-b border-[#352317] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs text-[#B8AA9A] hover:text-[#F5D17A] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        {/* READING TOOLS CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center bg-[#24170F] rounded-lg border border-[#352317] p-1">
            <button
              onClick={() => setFontSize("sm")}
              className={`px-2 py-0.5 text-xs rounded ${fontSize === "sm" ? "bg-[#D4A64A] text-black font-bold" : "text-[#B8AA9A]"}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("base")}
              className={`px-2 py-0.5 text-xs rounded ${fontSize === "base" ? "bg-[#D4A64A] text-black font-bold" : "text-[#B8AA9A]"}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-2 py-0.5 text-xs rounded ${fontSize === "lg" ? "bg-[#D4A64A] text-black font-bold" : "text-[#B8AA9A]"}`}
            >
              A+
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme((prev) => (prev === "dark" ? "sepia" : "dark"))}
            className="p-2 rounded-lg bg-[#24170F] border border-[#352317] text-[#D4A64A]"
            title="Cambiar tema de lectura"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg border transition-all ${
              isSaved
                ? "bg-[#D4A64A]/20 border-[#D4A64A] text-[#F5D17A]"
                : "bg-[#24170F] border-[#352317] text-[#B8AA9A]"
            }`}
            title="Guardar"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#F5D17A]" : ""}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-[#24170F] border border-[#352317] text-[#D4A64A] relative"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
            {copySuccess && (
              <span className="absolute -bottom-8 right-0 bg-[#D4A64A] text-black text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap">
                ¡Enlace copiado!
              </span>
            )}
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* HERO BANNER HEADER */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4A64A]/40 bg-[#24170F] shadow-2xl">
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image src={story.imageUrl} alt={story.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D09] via-[#120D09]/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col">
            <span className="bg-[#D4A64A]/20 border border-[#D4A64A]/50 text-[#F5D17A] text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
              {story.chapterReference}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F8F2E8] mb-2 leading-tight">
              {story.title}
            </h1>
            <p className="text-sm md:text-base text-[#B8AA9A] max-w-2xl">{story.subtitle || story.description}</p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={handleListen}
                className="btn-gold px-6 py-3 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Headphones className="w-4 h-4 text-black" />
                Escuchar Narración
              </button>

              <button
                onClick={handleComplete}
                className={`px-5 py-3 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 border transition-all ${
                  completed
                    ? "bg-green-900/40 border-green-500 text-green-300"
                    : "btn-gold-outline"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${completed ? "text-green-400" : ""}`} />
                <span>{completed ? "Historia Completada" : "Marcar como Completada"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE TOGGLE SWITCH (Narrativa vs Texto Literal vs Modo Escenas Ilustradas) */}
        <div className="flex items-center justify-center p-1.5 bg-[#24170F] border border-[#352317] rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setReadingMode("narrative")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              readingMode === "narrative"
                ? "bg-[#D4A64A] text-black shadow-md"
                : "text-[#B8AA9A] hover:text-white"
            }`}
          >
            Adaptación Narrativa
          </button>

          <button
            onClick={() => setReadingMode("literal")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              readingMode === "literal"
                ? "bg-[#D4A64A] text-black shadow-md"
                : "text-[#B8AA9A] hover:text-white"
            }`}
          >
            Texto Bíblico Literal
          </button>

          {scenes.length > 0 && (
            <button
              onClick={() => setReadingMode("interactive")}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                readingMode === "interactive"
                  ? "bg-[#D4A64A] text-black shadow-md"
                  : "text-[#F5D17A] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Modo Escenas
            </button>
          )}
        </div>

        {/* READING CONTENT AREA */}
        {readingMode === "narrative" && (
          <article className={`biblical-card p-6 md:p-10 ${getFontSizeClass()} space-y-6 text-[#F8F2E8]/90 font-sans`}>
            {story.narrativeContent.split("\n\n").map((para: string, idx: number) => (
              <p key={idx} className="first-letter:font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-[#F5D17A] first-letter:mr-1">
                {para}
              </p>
            ))}
          </article>
        )}

        {readingMode === "literal" && (
          <article className={`biblical-card p-6 md:p-10 ${getFontSizeClass()} space-y-6 border-l-4 border-l-[#D4A64A]`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A64A] uppercase tracking-wider mb-2">
              <Quote className="w-4 h-4" />
              <span>Cita Bíblica Literal - Reina-Valera 1909 (Dominio Público)</span>
            </div>
            {story.literalContent.split("\n\n").map((para: string, idx: number) => (
              <p key={idx} className="italic text-[#F8F2E8]/90 font-serif leading-relaxed">
                {para}
              </p>
            ))}
          </article>
        )}

        {readingMode === "interactive" && scenes.length > 0 && (
          <div className="space-y-6">
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#D4A64A]/50 bg-[#24170F] shadow-2xl">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src={scenes[activeSceneIndex].image || story.imageUrl}
                  alt={scenes[activeSceneIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D09] via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-bold text-[#F5D17A] bg-[#120D09]/80 px-3 py-1 rounded-full border border-[#D4A64A]/30 mb-2 inline-block">
                  Escena {activeSceneIndex + 1} de {scenes.length}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  {scenes[activeSceneIndex].title}
                </h3>
                <p className="text-sm md:text-base text-[#F8F2E8] mb-3">
                  {scenes[activeSceneIndex].narrative}
                </p>
                <div className="text-xs italic text-[#D4A64A] border-l-2 border-[#D4A64A] pl-3 py-1">
                  {scenes[activeSceneIndex].quote}
                </div>
              </div>
            </div>

            {/* SCENE NAV CONTROLS */}
            <div className="flex items-center justify-between bg-[#24170F] border border-[#352317] p-3 rounded-2xl">
              <button
                onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSceneIndex === 0}
                className="btn-gold-outline px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" /> Escena Anterior
              </button>

              <div className="flex items-center gap-1.5">
                {scenes.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeSceneIndex === idx ? "bg-[#D4A64A] w-6" : "bg-[#352317]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveSceneIndex((prev) => Math.min(scenes.length - 1, prev + 1))}
                disabled={activeSceneIndex === scenes.length - 1}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
              >
                Siguiente Escena <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM STORY NAVIGATION (PREV & NEXT STORY) */}
        <div className="pt-8 border-t border-[#352317] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {story.prevStory ? (
            <Link
              href={`/historias/${story.prevStory.slug}`}
              className="biblical-card p-4 flex items-center gap-3 hover:border-[#D4A64A] transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-[#D4A64A] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] text-[#B8AA9A] uppercase tracking-wider block">Anterior</span>
                <span className="text-sm font-semibold text-[#F8F2E8] group-hover:text-[#F5D17A]">
                  {story.prevStory.title}
                </span>
              </div>
            </Link>
          ) : <div />}

          {story.nextStory && (
            <Link
              href={`/historias/${story.nextStory.slug}`}
              className="biblical-card p-4 flex items-center justify-end gap-3 hover:border-[#D4A64A] transition-all text-right group"
            >
              <div>
                <span className="text-[10px] text-[#B8AA9A] uppercase tracking-wider block">Siguiente</span>
                <span className="text-sm font-semibold text-[#F8F2E8] group-hover:text-[#F5D17A]">
                  {story.nextStory.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D4A64A] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
