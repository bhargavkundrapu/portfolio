import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import "./Footer.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isActiveSection = false }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [sectionRef, isInView] = useIntersectionObserver();
  

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      if (isActiveSection) {
        // Section is active - play and respect mute state
        video.muted = isMuted;
        video.play().catch((err) => {
          console.warn("Autoplay issue:", err);
        });
      } else {
        // Section is not active - pause and mute
        video.pause();
        video.muted = true;
        setIsMuted(true); // Reset mute state
      }
    }

    // Start animations after component mounts
    if (isActiveSection) {
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
  }, [isMuted, isActiveSection]);

  const Footer = () => {
    const video = videoRef.current;
    if (video && isActiveSection) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };


const TypewriterEffect = ({ 
  text = "Welcome to our amazing website!", 
  speed = 100, 
  showCursor = false,
  className = "",
  onComplete = null 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [displayText, text, speed, onComplete]);
  return (
    <div className={`inline-block ${className}`}>
      <span className="">
        {displayText}
        {showCursor && <span className="ml-1 animate-pulse">|</span>}
      </span>
    </div>
  );
};



  return (
    <section ref={sectionRef} id="footer" className="footer-container h-dvh w-screen overflow-x-hidden stack">
       <div className="h-full w-full  flex items-center justify-center">
        {/* main container */}
        <div className="h-full w-full flex flex-col items-center justify-center">
          {/* the main text */}
          <div className="h-[60%] w-[80%] flex flex-col items-center justify-center pt-15 gap-5">
            <p className="font-robert-small text-8xl sm:text-9xl font-extrabold text-[#50d71e]">
             <TypewriterEffect 
                text="What Next..."
                speed={80}
                className=""
              />
            </p>
            <p className="font-robert-medium text-[#f79d00] text-3xl sm:text-6xl font-bold">
             Looking For a Creative Developer?
            </p>
            <p className="font-robert-medium text-md font-semibold text-[#b695f9]">
              The web is my canvas, JavaScript is my brush, and user satisfaction is my masterpiece.
            </p>
          </div>

          {/* social icons */}
          <div className="h-[30%] w-[100%]  flex items-center justify-center">
            <div className="h-[30%] w-[70%] sm:h-[35%] sm:w-[20%] bg-alpine-frost rounded-4xl flex items-center justify-around">
              <div className="h-[90%] rounded-4xl w-[20%] text-5xl flex items-center justify-center text-carbon-mist hover:scale-125 duration-200 transition-all hover:text-blue-600 transform hover:-translate-y-3 cursor-pointer">
                <a
                  href="https://x.com/BhargavKundrapu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaXTwitter />
                </a>
              </div>
              <div className="h-[90%] rounded-4xl w-[20%] text-5xl flex items-center justify-center text-carbon-mist hover:scale-125 duration-200 transition-all hover:text-blue-600 transform hover:-translate-y-3 cursor-pointer">
                <a
                  href="http://github.com/bhargavkundrapu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IoLogoGithub />
                </a>
              </div>
              <div className="h-[90%] rounded-4xl w-[20%] text-5xl flex items-center justify-center text-carbon-mist hover:scale-125 duration-200 transition-all hover:text-blue-600 transform hover:-translate-y-3 cursor-pointer">
                <a
                  href="http://www.linkedin.com/in/bhargav-kundrapu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Footer;