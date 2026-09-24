import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function VideoPlay() {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, toggleMute] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col md:flex-row h-screen w-full bg-white"
      onClick={() => {
        if (videoEnded) navigate("/home");
      }}
    >
      <div className="w-full h-full object-cover">
        <video
          ref={videoRef}
          src="/intro.mp4"
          onEnded={() => setVideoEnded(true)}
          autoPlay
          muted={isMuted}
          playsInline // Recommended for mobile
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-4 right-4
              bg-black/50 hover:bg-black/70 text-white
              rounded-full p-2
              transition-all duration-300
              shadow-lg
              flex items-center justify-center
              z-20 hover:cursor-pointer px-4 font-semibold"
          onClick={() => toggleMute((prev) => !prev)}
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"} {/* Show appropriate icon/text */}
        </button>
      </div>
    </div>
  );
}

export default VideoPlay;
