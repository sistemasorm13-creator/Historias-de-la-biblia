"use client";

import React, { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { AudioProvider } from "./AudioContext";
import PersistentAudioPlayer from "./PersistentAudioPlayer";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <AudioProvider>
        {children}
        <PersistentAudioPlayer />
      </AudioProvider>
    </UserProvider>
  );
}
