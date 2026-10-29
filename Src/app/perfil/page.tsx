"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useUser } from "@/components/UserContext";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Flame,
  BookOpen,
  Headphones,
  Bookmark,
  Award,
  Edit3,
  CheckCircle2,
  Bell,
  Clock,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";

export default function PerfilPage() {
  const { user, updateProfile, refreshUser } = useUser();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [notifPermission, setNotifPermission] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/profile?userId=${user?.id || "user-demo"}`);
        const data = await res.json();
        if (data.success) {
          setProfileData(data.profile);
          setNameInput(data.profile.name);
          setAvatarInput(data.profile.avatarUrl || "");
        }
      } catch (e) {
        console.error("Error loading profile:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    if (typeof window !== "undefined" && "Notification" in window) {
      setNotifPermission(Notification.permission === "granted");
    }
  }, [user?.id]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(nameInput, avatarInput);
    if (ok) {
      setEditing(false);
      refreshUser();
    }
  };

  const requestNotification = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setNotifPermission(true);
        new Notification("Historias Bíblicas", {
          body: "¡Notificaciones activadas! Te avisaremos con la Historia Bíblica del Día.",
          icon: "/images/david-goliath.jpg",
        });
      }
    }
  };

  const achievementsList = [
    { key: "first_story", title: "Primera Historia", desc: "Completaste tu primera lectura bíblica", icon: "📖" },
    { key: "10_stories", title: "10 Historias Completadas", desc: "Has leído 10 grandes relatos bíblicos", icon: "🌟" },
    { key: "50_stories", title: "50 Historias Completadas", desc: "Gran conocedor de la Palabra", icon: "🏆" },
    { key: "ot_explorer", title: "Explorador del A.T.", desc: "Exploraste el Antiguo Testamento", icon: "📜" },
    { key: "nt_explorer", title: "Explorador del N.T.", desc: "Exploraste los Evangelios e historias del N.T.", icon: "🕊️" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D09] flex flex-col items-center justify-center text-[#D4A64A]">
        <div className="w-12 h-12 border-4 border-[#D4A64A] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif mt-4">Cargando perfil de usuario...</p>
      </div>
    );
  }

  const p = profileData || user;
  const userAchs = p?.achievements || [];
  const readCount = p?.storiesReadCount || 0;
  const totalAvailable = p?.totalStoriesAvailable || 10;
  const progressPercent = Math.min(100, Math.round((readCount / totalAvailable) * 100));

  return (
    <div className="min-h-screen bg-[#120D09] text-[#F8F2E8] pb-24 md:pb-12 md:pl-64">
      <Navigation showFilters={false} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-8">
        {/* PROFILE CARD BANNER */}
        <div className="bg-[#24170F] border border-[#D4A64A]/30 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4A64A] shadow-xl flex-shrink-0">
              <Image
                src={p?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt={p?.name || "Usuario"}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#F8F2E8]">
                  {p?.name || "Lector Fiel"}
                </h1>
                {p?.role === "admin" && (
                  <span className="bg-[#D4A64A] text-black text-[10px] font-bold px-2 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </div>

              <p className="text-xs text-[#B8AA9A]">{p?.email}</p>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5D17A] bg-[#352317] px-3 py-1 rounded-full border border-[#D4A64A]/30 mt-2">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>Racha de {p?.streakDays || 1} días consecutivos</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="btn-gold-outline px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>{editing ? "Cancelar" : "Editar Perfil"}</span>
          </button>
        </div>

        {/* EDIT PROFILE FORM */}
        {editing && (
          <form onSubmit={handleSaveProfile} className="biblical-card p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F5D17A]">Editar Datos de Cuenta</h3>
            <div>
              <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">Nombre</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#B8AA9A] block mb-1">URL Fotografía de Perfil</label>
              <input
                type="text"
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                className="w-full bg-[#24170F] border border-[#352317] rounded-xl px-4 py-2 text-xs text-[#F8F2E8] outline-none focus:border-[#D4A64A]"
              />
            </div>

            <button type="submit" className="btn-gold px-6 py-2 rounded-xl text-xs font-bold">
              Guardar Cambios
            </button>
          </form>
        )}

        {/* CONTINUAR LEYENDO / LAST READ STORY */}
        {p?.lastReadStory && (
          <div className="biblical-card p-5 border-l-4 border-l-[#D4A64A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4A64A] uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Continuar Leyendo
              </span>
              <span className="text-xs text-[#B8AA9A]">{p.lastReadStory.progressPercentage}% completado</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F8F2E8]">
                  {p.lastReadStory.title}
                </h4>
                <p className="text-xs text-[#B8AA9A]">{p.lastReadStory.chapterReference}</p>
              </div>

              <Link
                href={`/historias/${p.lastReadStory.slug}`}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                Reanudar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* PROGRESS STATS GRID */}
        <section className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8]">
            Mi Progreso Bíblico
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="biblical-card p-4 text-center space-y-1">
              <BookOpen className="w-6 h-6 text-[#D4A64A] mx-auto" />
              <div className="font-serif text-2xl font-bold text-[#F8F2E8]">{readCount}</div>
              <div className="text-[11px] text-[#B8AA9A]">Historias leídas</div>
            </div>

            <div className="biblical-card p-4 text-center space-y-1">
              <Headphones className="w-6 h-6 text-[#D4A64A] mx-auto" />
              <div className="font-serif text-2xl font-bold text-[#F8F2E8]">{p?.storiesReadCount || 2}</div>
              <div className="text-[11px] text-[#B8AA9A]">Historias escuchadas</div>
            </div>

            <div className="biblical-card p-4 text-center space-y-1">
              <Bookmark className="w-6 h-6 text-[#D4A64A] mx-auto" />
              <div className="font-serif text-2xl font-bold text-[#F8F2E8]">{p?.storiesSavedCount || 0}</div>
              <div className="text-[11px] text-[#B8AA9A]">Guardadas</div>
            </div>

            <div className="biblical-card p-4 text-center space-y-1">
              <Clock className="w-6 h-6 text-[#D4A64A] mx-auto" />
              <div className="font-serif text-2xl font-bold text-[#F8F2E8]">{p?.totalReadingMinutes || 45} m</div>
              <div className="text-[11px] text-[#B8AA9A]">Tiempo de lectura</div>
            </div>
          </div>

          {/* VISUAL PROGRESS BAR */}
          <div className="biblical-card p-5 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#F8F2E8]">Progreso general de la biblioteca</span>
              <span className="text-[#F5D17A]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#24170F] h-3 rounded-full overflow-hidden border border-[#352317]">
              <div
                className="bg-gradient-to-r from-[#D4A64A] to-[#F5D17A] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS / LOGROS */}
        <section className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-[#F8F2E8] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F5D17A]" />
            <span>Logros y Medallas</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievementsList.map((ach) => {
              const unlocked = userAchs.includes(ach.key);
              return (
                <div
                  key={ach.key}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                    unlocked
                      ? "bg-[#24170F] border-[#D4A64A] shadow-md"
                      : "bg-[#120D09]/60 border-[#352317] opacity-60"
                  }`}
                >
                  <span className="text-3xl">{ach.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-[#F8F2E8]">{ach.title}</h4>
                      {unlocked && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    </div>
                    <p className="text-[11px] text-[#B8AA9A]">{ach.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DAILY NOTIFICATIONS PROMPT */}
        <div className="biblical-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#D4A64A]" />
            <div>
              <h4 className="font-bold text-sm text-[#F8F2E8]">Recordatorio Diario de la Historia del Día</h4>
              <p className="text-xs text-[#B8AA9A]">Recibe una historia inspiradora todos los días a tu navegador.</p>
            </div>
          </div>

          <button
            onClick={requestNotification}
            disabled={notifPermission}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              notifPermission ? "bg-green-900/40 text-green-300 border border-green-500" : "btn-gold"
            }`}
          >
            {notifPermission ? "Notificaciones Activadas" : "Activar Notificaciones"}
          </button>
        </div>
      </main>
    </div>
  );
}
