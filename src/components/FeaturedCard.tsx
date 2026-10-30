"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones, BookOpen, Clock, Sparkles, Bookmark } from "lucide-react";
import { useAudio } from "./AudioContext";
import { useUser } from "./UserContext";

interface FeaturedCardProps {
  story: {
    id: number;
    slug: string;
    title: string;
    chapterReference: string;
    readingTimeMinutes: number;
    description: string;
    imageUrl: string;
    narrativeContent?: string;
  };
}

export default function FeaturedCard({ story }: FeaturedCardProps) {
  const { playStory } = useAudio();
  const { savedIds, toggleBookmark } = useUser();
  const isSaved = savedIds.includes(story.id);

  const handleListen = (e: React.MouseEvent) => {
    e.preventDefault();
    playStory({
      id: story.id,
      slug: story.slug,
      title: story.title,
      chapterReference: story.chapterReference,
      imageUrl: story.imageUrl,
      readingTimeMinutes: story.readingTimeMinutes,
      narrativeContent: story.narrativeContent || story.description,
    });
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleBookmark(story.id);
  };

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4A64A]/40 bg-[#24170F] shadow-[0_10px_40px_rgba(0,0,0,0.6)] group">
      {/* Background Image with Gradient Overlay */}
      <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120D09] via-[#120D09]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120D09]/80 via-transparent to-transparent" />
      </div>

      {/* Floating Badge */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
        <span className="bg-[#24170F]/90 text-[#F5D17A] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#D4A64A]/50 shadow-md backdrop-blur-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D17A]" />
          Destacado del Día
        </span>
      </div>

      {/* Save Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-[#24170F]/80 border border-[#D4A64A]/40 text-[#F5D17A] hover:bg-[#D4A64A] hover:text-[#120D09] transition-all backdrop-blur-md shadow-md"
        title="Guardar historia"
      >
        <Bookmark className={`w-5 h-5 ${isSaved ? "fill-[#F5D17A]" : ""}`} />
      </button>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col justify-end">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8F2E8] mb-2 tracking-wide leading-tight drop-shadow-md">
          {story.title}
        </h2>

        <div className="flex items-center gap-3 text-xs md:text-sm text-[#B8AA9A] mb-4">
          <span className="flex items-center gap-1 text-[#F5D17A] font-medium">
            <Clock className="w-4 h-4" />
            Lectura de {story.readingTimeMinutes} min
          </span>
          <span>•</span>
          <span className="font-semibold text-[#F8F2E8]">{story.chapterReference}</span>
        </div>

        <p className="text-xs md:text-sm text-[#B8AA9A] line-clamp-2 max-w-2xl mb-6 hidden sm:block">
          {story.description}
        </p>

        {/* Buttons matching reference screenshot */}
        <div className="flex items-center gap-3">
          <Link
            href={`/historias/${story.slug}`}
            className="btn-gold px-6 py-3 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            Leer Historia
          </Link>

          <button
            onClick={handleListen}
            className="btn-gold-outline px-5 py-3 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 shadow-md"
          >
            <Headphones className="w-4 h-4 text-[#F5D17A]" />
            Escuchar
          </button>
        </div>
      </div>
    </div>
  );
}
