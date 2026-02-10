import { useState, useRef } from "react";

const BackgroundMusic = () => {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggle = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Interaction needed"));
        }
        setPlaying(!playing);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>
            <button
                onClick={toggle}
                className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-pink-200"
            >
                {playing ? "🎵" : "🔇"}
            </button>
            <div className="absolute -top-10 right-0 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold text-pink-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {playing ? "Playing Music" : "Play Music"}
            </div>
        </div>
    );
};

export default BackgroundMusic;
