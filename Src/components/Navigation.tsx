"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Compass,
  Bookmark,
  User,
  Search,
  SlidersHorizontal,
  Menu,
  X,
  Sparkles,
  Shield,
  Volume2,
} from "lucide-react";
import { useUser } from "./UserContext";
import Image from "next/image";

interface NavigationProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
  showFilters?: boolean;
}

export default function Navigation({
  searchQuery = "",
  onSearchChange,
  selectedCategory = "Todos",
  onCategoryChange,
  showFilters = true,
}: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchQueryState] = useState(searchQuery);

  const categories = [
    "Todos",
    "Antiguo Testamento",
    "Nuevo Testamento",
    "Parábolas",
    "Poesía",
    "Profetas",
  ];

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/biblioteca", label: "Biblioteca", icon: BookOpen },
    { href: "/descubrir", label: "Descubrir", icon: Compass },
    { href: "/guardados", label: "Guardados", icon: Bookmark },
    { href: "/perfil", label: "Perfil", icon: User },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchInput);
    } else if (searchInput.trim()) {
      router.push(`/?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleCategoryClick = (cat: string) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR MENU */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 bg-[#24170F] border-r border-[#352317] z-30 p-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-10 h-10 rounded-xl btn-gold flex items-center justify-center font-serif text-xl font-bold shadow-md">
            HB
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#F5D17A] tracking-wider leading-tight group-hover:text-white transition-colors">
              HISTORIAS
            </h1>
            <p className="font-serif text-xs text-[#D4A64A] tracking-widest font-semibold">
              BÍBLICAS
            </p>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4A64A] to-[#B8852B] text-[#120D09] font-semibold shadow-lg shadow-[#D4A64A]/20"
                    : "text-[#B8AA9A] hover:bg-[#352317] hover:text-[#F8F2E8]"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#120D09]" : "text-[#D4A64A]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* ADMIN LINK IF ADMIN OR DEMO */}
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-[#D4A64A]/20 mt-6 ${
              pathname === "/admin"
                ? "bg-[#D4A64A]/20 text-[#F5D17A] border-[#D4A64A]"
                : "text-[#B8AA9A] hover:bg-[#352317] hover:text-[#F5D17A]"
            }`}
          >
            <Shield className="w-5 h-5 text-[#D4A64A]" />
            <span>Panel Admin</span>
          </Link>
        </nav>

        {/* USER PROFILE MINI CARD AT BOTTOM */}
        <Link
          href="/perfil"
          className="flex items-center gap-3 p-3 rounded-xl bg-[#352317]/60 border border-[#D4A64A]/20 hover:border-[#D4A64A]/50 transition-all"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4A64A]">
            <Image
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt={user?.name || "Usuario"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#F8F2E8] truncate">
              {user?.name || "Lector Fiel"}
            </h4>
            <p className="text-[10px] text-[#D4A64A] truncate">
              🔥 Racha de {user?.streakDays || 1} días
            </p>
          </div>
        </Link>
      </aside>

      {/* MOBILE TOP BAR */}
      <header className="md:hidden sticky top-0 z-30 bg-[#120D09]/95 backdrop-blur-md border-b border-[#352317] px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#B8AA9A] hover:text-[#D4A64A] transition-colors"
            title="Menú"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="text-center">
            <h1 className="font-serif text-lg font-bold text-[#F5D17A] tracking-widest leading-none">
              HISTORIAS BÍBLICAS
            </h1>
          </Link>

          <Link
            href="/perfil"
            className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4A64A]/60"
          >
            <Image
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="Perfil"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* SEARCH BAR & FILTERS */}
        {showFilters && (
          <div className="space-y-2">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8AA9A]" />
                <input
                  type="text"
                  placeholder="Buscar historias, libros o personajes..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchQueryState(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  className="w-full bg-[#24170F] border border-[#352317] focus:border-[#D4A64A] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F8F2E8] placeholder-[#B8AA9A]/60 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-[#24170F] border border-[#352317] hover:border-[#D4A64A] rounded-xl text-[#D4A64A]"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </form>

            {/* CATEGORY PILL FILTER CAROUSEL */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isSel = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all ${
                      isSel
                        ? "bg-[#D4A64A] text-[#120D09] font-bold shadow-md shadow-[#D4A64A]/30"
                        : "bg-[#24170F] text-[#B8AA9A] border border-[#352317] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#120D09]/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#352317]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg btn-gold flex items-center justify-center font-serif text-sm font-bold">
                HB
              </div>
              <span className="font-serif text-lg font-bold text-[#F5D17A]">
                HISTORIAS BÍBLICAS
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#B8AA9A] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-3 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-[#F8F2E8] bg-[#24170F] border border-[#352317] hover:border-[#D4A64A]"
                >
                  <Icon className="w-5 h-5 text-[#D4A64A]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-[#F5D17A] bg-[#352317]/50 border border-[#D4A64A]/30 mt-6"
            >
              <Shield className="w-5 h-5 text-[#D4A64A]" />
              <span>Panel de Administración</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-[#352317] text-center text-xs text-[#B8AA9A]">
            <p>Historias Bíblicas © 2026</p>
            <p className="text-[10px] text-[#D4A64A] mt-1">Biblioteca Digital Ilustrada</p>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#24170F]/95 backdrop-blur-md border-t border-[#352317] px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1 text-[10px] transition-all ${
                isActive ? "text-[#F5D17A] font-bold scale-105" : "text-[#B8AA9A] hover:text-white"
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  isActive ? "bg-[#D4A64A]/20 border border-[#D4A64A]" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#F5D17A]" : "text-[#B8AA9A]"}`} />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
