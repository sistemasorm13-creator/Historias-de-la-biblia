"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones, Bookmark, Clock, Play } from "lucide-react";
import { useAudio } from "./AudioContext";
import { useUser } from "./UserContext";

export interface StoryCardProps {
  story: {
    id: number;
    slug: string;
    title: string;
    chapterReference: string;
    readingTimeMinutes: number;
    description?: string;
    imageUrl: string;
    category?: string;
    narrativeContent?: string;
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  const { playStory } = useAudio();
  const { savedIds, toggleBookmark } = useUser();
  const isSaved = savedIds.includes(story.id);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    playStory({
      id: story.id,
      slug: story.slug,
      title: story.title,
      chapterReference: story.chapterReference,
      imageUrl: story.imageUrl,
      readingTimeMinutes: story.readingTimeMinutes,
      narrativeContent: story.narrativeContent || story.description || story.title,
    });
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    await toggleBookmark(story.id);
  };

  return (
    <div className="biblical-card p-3 md:p-4 flex items-center justify-between gap-3 group">
      <Link href={`/historias/${story.slug}`} className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#D4A64A]/30 flex-shrink-0">
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-[#F8F2E8] group-hover:text-[#F5D17A] transition-colors truncate">
            {story.title}
          </h3>
          <p className="text-xs text-[#D4A64A] truncate mt-0.5">
            {story.chapterReference}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#B8AA9A] mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#B8AA9A]" />
              Lectura de {story.readingTimeMinutes} min
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-xl transition-all ${
            isSaved
              ? "bg-[#D4A64A]/20 text-[#F5D17A] border border-[#D4A64A]"
              : "text-[#B8AA9A] hover:text-[#F5D17A] hover:bg-[#352317]"
          }`}
          title={isSaved ? "Quitar de guardados" : "Guardar historia"}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#F5D17A]" : ""}`} />
        </button>

        <button
          onClick={handlePlayAudio}
          className="p-2 rounded-xl btn-gold text-[#120D09] shadow-md hover:scale-105 transition-transform"
          title="Escuchar audio"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>
      </div>
    </div>
  );
}
