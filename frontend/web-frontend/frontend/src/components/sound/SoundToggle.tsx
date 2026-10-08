import { useRef, useState } from "react";

function SoundToggle() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSound = async () => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/audio/background.mp3");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.35;
        }

        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Unable to play background music:", error);
            }
        }
    };

    return (
        <button
            onClick={toggleSound}
            aria-label={isPlaying ? "Turn sound off" : "Turn sound on"}
            className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 md:block"
        >
            <span className="sound-label text-[10px] uppercase tracking-[0.25em] text-black/50">
                Sound {isPlaying ? "On" : "Off"}
            </span>
        </button>
    );
}

export default SoundToggle;