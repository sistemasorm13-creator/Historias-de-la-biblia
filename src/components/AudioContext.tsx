"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface ActiveTrack {
  id: number;
  slug: string;
  title: string;
  chapterReference: string;
  imageUrl: string;
  readingTimeMinutes: number;
  narrativeContent: string;
  audioUrl?: string | null;
}

interface AudioContextType {
  activeTrack: ActiveTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  playStory: (track: ActiveTrack) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  skipSeconds: (delta: number) => void;
  setRate: (rate: number) => void;
  setVol: (vol: number) => void;
  closePlayer: () => void;
  ambientMusic: boolean;
  toggleAmbientMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default duration estimation
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [ambientMusic, setAmbientMusic] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const playStory = (track: ActiveTrack) => {
    stopCurrentAudio();
    setActiveTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);

    // Calculate approximate duration based on text length
    const words = track.narrativeContent.split(/\s+/).length;
    const estSeconds = Math.max(60, Math.round((words / 130) * 60));
    setDuration(estSeconds);

    if (synthRef.current) {
      synthRef.current.cancel();

      // Clean speech text
      const cleanText = track.title + ". " + track.chapterReference + ". " + track.narrativeContent.replace(/[*#]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "es-ES";
      utterance.rate = playbackRate;
      utterance.volume = volume;

      // Try setting Spanish voice
      const voices = synthRef.current.getVoices();
      const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        clearTimer();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        clearTimer();
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);

      // Start elapsed timer
      clearTimer();
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= estSeconds) {
            clearTimer();
            return estSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
  };

  const stopCurrentAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    clearTimer();
  };

  const togglePlay = () => {
    if (!activeTrack) return;
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const pause = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.pause();
    }
    setIsPlaying(false);
    clearTimer();
  };

  const resume = () => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => Math.min(duration, prev + 1));
      }, 1000 / playbackRate);
    } else if (activeTrack) {
      playStory(activeTrack);
    }
  };

  const seek = (seconds: number) => {
    setCurrentTime(seconds);
  };

  const skipSeconds = (delta: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + delta));
    setCurrentTime(newTime);
  };

  const setRate = (rate: number) => {
    setPlaybackRate(rate);
    if (activeTrack && isPlaying) {
      // Re-trigger with new rate at relative position if needed
      if (synthRef.current) {
        synthRef.current.cancel();
        playStory(activeTrack);
      }
    }
  };

  const setVol = (v: number) => {
    setVolume(v);
  };

  const closePlayer = () => {
    stopCurrentAudio();
    setActiveTrack(null);
    setIsPlaying(false);
  };

  const toggleAmbientMusic = () => {
    setAmbientMusic((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        volume,
        playStory,
        togglePlay,
        pause,
        resume,
        seek,
        skipSeconds,
        setRate,
        setVol,
        closePlayer,
        ambientMusic,
        toggleAmbientMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
