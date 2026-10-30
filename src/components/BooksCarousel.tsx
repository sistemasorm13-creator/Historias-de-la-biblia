"use client";

import React from "react";
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
  ChevronRight,
} from "lucide-react";

interface BookItem {
  id: number;
  slug: string;
  name: string;
  iconType: string;
  testament: string;
  category: string;
}

interface BooksCarouselProps {
  books: BookItem[];
}

export default function BooksCarousel({ books }: BooksCarouselProps) {
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

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#F8F2E8]">
          Libros de la Biblia
        </h3>
        <Link
          href="/biblioteca"
          className="text-xs md:text-sm text-[#B8AA9A] hover:text-[#F5D17A] flex items-center gap-1 font-medium transition-colors"
        >
          <span>Ver todo</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 md:mx-0 md:px-0">
        {books.map((book) => {
          const IconComp = getIcon(book.iconType);
          return (
            <Link
              key={book.slug}
              href={`/biblioteca/${book.slug}`}
              className="flex flex-col items-center justify-center p-4 min-w-[100px] sm:min-w-[115px] rounded-2xl bg-[#352317]/80 border border-[#D4A64A]/30 hover:border-[#D4A64A] hover:bg-[#352317] hover:scale-105 transition-all shadow-md group text-center flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full border border-[#D4A64A]/40 bg-[#24170F] flex items-center justify-center text-[#F5D17A] group-hover:bg-[#D4A64A] group-hover:text-[#120D09] transition-colors mb-2.5 shadow-inner">
                <IconComp className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="font-serif text-xs font-semibold text-[#F8F2E8] group-hover:text-[#F5D17A] truncate w-full">
                {book.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
