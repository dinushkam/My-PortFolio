import { createContext, useContext, useEffect, useRef, useState } from "react";
import sakura from "../assets/sakura.mp3";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  if (!audioRef.current) {
    audioRef.current = new Audio(sakura);
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
  }

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const toggleMusic = () => setIsPlayingMusic((prev) => !prev);

  return (
    <MusicContext.Provider value={{ isPlayingMusic, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}