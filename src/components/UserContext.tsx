"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: string;
  streakDays: number;
  totalReadingMinutes: number;
  storiesReadCount: number;
  storiesSavedCount: number;
  achievements: string[];
}

interface UserContextType {
  user: UserProfile | null;
  savedIds: number[];
  isLoading: boolean;
  toggleBookmark: (storyId: number) => Promise<boolean>;
  refreshUser: () => void;
  updateProfile: (name: string, avatarUrl: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: "user-demo",
    email: "lector@historiasbiblicas.com",
    name: "Lector Fiel",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    role: "user",
    streakDays: 3,
    totalReadingMinutes: 45,
    storiesReadCount: 4,
    storiesSavedCount: 2,
    achievements: ["first_story"],
  });
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/profile?userId=${user?.id || "user-demo"}`);
      const data = await res.json();
      if (data.success && data.profile) {
        setUser(data.profile);
      }

      // Fetch saved ids
      const savedRes = await fetch(`/api/saved?userId=${user?.id || "user-demo"}`);
      const savedData = await savedRes.json();
      if (savedData.success) {
        setSavedIds(savedData.saved.map((item: any) => item.id));
      }
    } catch (e) {
      console.error("Error fetching user profile:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const toggleBookmark = async (storyId: number): Promise<boolean> => {
    try {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id || "user-demo", storyId }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.saved) {
          setSavedIds((prev) => [...prev, storyId]);
        } else {
          setSavedIds((prev) => prev.filter((id) => id !== storyId));
        }
        fetchProfile();
        return data.saved;
      }
      return false;
    } catch (e) {
      console.error("Error toggling bookmark:", e);
      return false;
    }
  };

  const updateProfile = async (name: string, avatarUrl: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id || "user-demo", name, avatarUrl }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProfile();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        savedIds,
        isLoading,
        toggleBookmark,
        refreshUser: fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
