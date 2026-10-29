"use client";

import React, { useState } from "react";
import { useAudio } from "./AudioContext";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Music,
  Gauge,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function PersistentAudioPlayer() {
  const {
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    togglePlay,
    seek,
    skipSeconds,
    setRate,
    setVol,
    closePlayer,
    ambientMusic,
    toggleAmbientMusic,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!activeTrack) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const speeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <>
      {/* Expanded Modal Player View */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-[#120D09]/95 backdrop-blur-xl flex flex-col items-center justify-between p-6 md:p-12 animate-in fade-in duration-300">
          <div className="w-full max-w-lg flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#B8AA9A] hover:text-[#D4A64A] p-2 transition-colors"
            >
              <Minimize2 className="w-6 h-6" />
            </button>
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#D4A64A] font-semibold">
                Reproduciendo Historia
              </span>
            </div>
            <button
              onClick={closePlayer}
              className="text-[#B8AA9A] hover:text-red-400 p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full max-w-sm my-6 flex flex-col items-center text-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-[#D4A64A]/40 shadow-[0_0_40px_rgba(212,166,74,0.3)] mb-6">
              <Image
                src={activeTrack.imageUrl}
                alt={activeTrack.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D09] via-transparent to-transparent opacity-60" />
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F8F2E8] mb-1">
              {activeTrack.title}
            </h2>
            <p className="text-[#D4A64A] font-medium text-sm mb-2">
              {activeTrack.chapterReference}
            </p>
            <span className="text-xs text-[#B8AA9A] bg-[#352317] px-3 py-1 rounded-full border border-[#D4A64A]/20">
              Lectura aproximada de {activeTrack.readingTimeMinutes} min
            </span>
          </div>

          <div className="w-full max-w-lg flex flex-col gap-4">
            {/* Progress Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full accent-[#D4A64A] bg-[#352317] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#B8AA9A]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-6 py-2">
              <button
                onClick={() => skipSeconds(-15)}
                className="p-3 text-[#B8AA9A] hover:text-[#D4A64A] hover:bg-[#352317] rounded-full transition-all"
                title="Retroceder 15s"
              >
                <RotateCcw className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full btn-gold flex items-center justify-center text-[#120D09] shadow-lg shadow-[#D4A64A]/30 hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </button>

              <button
                onClick={() => skipSeconds(15)}
                className="p-3 text-[#B8AA9A] hover:text-[#D4A64A] hover:bg-[#352317] rounded-full transition-all"
                title="Adelantar 15s"
              >
                <RotateCw className="w-6 h-6" />
              </button>
            </div>

            {/* Speeds & Options */}
            <div className="flex items-center justify-between pt-2 border-t border-[#352317]">
              {/* Rate Selector */}
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4 text-[#D4A64A] mr-1" />
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => setRate(s)}
                    className={`px-2 py-1 text-xs rounded ${
                      playbackRate === s
                        ? "bg-[#D4A64A] text-[#120D09] font-bold"
                        : "text-[#B8AA9A] hover:text-white"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Ambient Music Toggle */}
              <button
                onClick={toggleAmbientMusic}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  ambientMusic
                    ? "bg-[#D4A64A]/20 border-[#D4A64A] text-[#F5D17A]"
                    : "border-[#352317] text-[#B8AA9A] hover:border-[#D4A64A]/50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Música ambiental</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Persistent Audio Bar */}
      <div className="fixed bottom-16 md:bottom-4 left-2 right-2 md:left-auto md:right-6 md:w-96 z-40 bg-[#24170F]/95 backdrop-blur-md border border-[#D4A64A]/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-3 text-[#F8F2E8] animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div
            onClick={() => setIsExpanded(true)}
            className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#D4A64A]/30 flex-shrink-0 cursor-pointer group"
          >
            <Image
              src={activeTrack.imageUrl}
              alt={activeTrack.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Details */}
          <div
            onClick={() => setIsExpanded(true)}
            className="flex-1 min-w-0 cursor-pointer"
          >
            <h4 className="font-semibold text-sm truncate text-[#F8F2E8] group-hover:text-[#F5D17A]">
              {activeTrack.title}
            </h4>
            <p className="text-xs text-[#D4A64A] truncate">
              {activeTrack.chapterReference}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => skipSeconds(-15)}
              className="p-1.5 text-[#B8AA9A] hover:text-[#D4A64A] transition-colors"
              title="-15s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full btn-gold flex items-center justify-center text-[#120D09] shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => skipSeconds(15)}
              className="p-1.5 text-[#B8AA9A] hover:text-[#D4A64A] transition-colors"
              title="+15s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 text-[#B8AA9A] hover:text-white transition-colors"
              title="Expandir"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={closePlayer}
              className="p-1.5 text-[#B8AA9A] hover:text-red-400 transition-colors"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini progress line */}
        <div className="w-full bg-[#352317] h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#D4A64A] to-[#F5D17A] h-full transition-all duration-300"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
