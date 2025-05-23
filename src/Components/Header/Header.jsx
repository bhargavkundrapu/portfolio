import ironman from "../../assets/iamronman.mp4";
import { useRef, useState, useEffect } from "react";
import { BiSolidVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import "./Header.css";

const Header = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Ensure muted on load for autoplay
      video.play().catch((err) => {
        console.warn("Autoplay error:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const newMute = !isMuted;
      setIsMuted(newMute);
      video.muted = newMute;

      if (!newMute) {
        video.play().catch((err) =>
          console.warn("Playback error after unmuting:", err)
        );
      }
    }
  };

  return (
    <div className="video-wrapper ">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        playsInline
        muted
      >
        <source src="https://res.cloudinary.com/dnbnst2wn/video/upload/v1747998167/Untitled_video_-_Made_with_Clipchamp_2_pn5bie.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="dark-overlay"></div>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <BiSolidVolumeMute /> : <GoUnmute />}
      </button>
    </div>
  );
};

export default Header;
