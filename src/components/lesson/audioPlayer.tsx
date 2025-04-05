import { useRef, useState, useEffect } from "react";

const AudioPlayer = ({
  audioUrl,
  onPause,
}: {
  audioUrl: string;
  onPause: (second: number) => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause(Number(currentTime.toFixed(2)))
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update the current time as the audio plays
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update duration when audio is loaded
  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Seek functionality
  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const clickPosition = (event.clientX - left) / width;
      audioRef.current.currentTime = clickPosition * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Calculate progress percentage, ensuring it's a valid number
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <button onClick={togglePlay} className="play-pause-button">
        {isPlaying ? "Pause" : "Play"}
      </button>

      <div
        className="progress-bar"
        onClick={handleSeek}
        style={{
          position: "relative",
          width: "100%",
          height: "8px",
          backgroundColor: "#ddd",
        }}
      >
        <div
          className="progress-bar-fill"
          style={{
            position: "absolute",
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: "#007BFF",
          }}
        />
      </div>

      <span>
        {currentTime.toFixed(2)} / {duration.toFixed(2)}
      </span>

      <audio
        ref={audioRef}
        src={audioUrl}
        onLoadedData={handleLoadedData}
        onError={() => console.error("Failed to load audio")}
      />
    </div>
  );
};

export default AudioPlayer;
