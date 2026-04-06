import { useMusic } from "../context/MusicContext";
import { soundoff, soundon } from "../assets/icons";

const MusicButton = () => {
  const { isPlayingMusic, toggleMusic } = useMusic();

  return (
    <div className="fixed bottom-12 left-4 z-50">
      <button
        onClick={toggleMusic}
        className="group rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-2.5 sm:p-3 shadow-[0_10px_40px_rgba(0,0,0,.35)] hover:bg-white/15 transition"
        title="Toggle music"
      >
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="Toggle music"
          className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer object-contain group-hover:scale-105 transition"
        />
      </button>
    </div>
  );
};

export default MusicButton;