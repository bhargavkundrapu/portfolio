import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import GradientText from "../About/GradientText";
import "./Skills.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ isActiveSection = false }) => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [intersectionRef, isInView] = useIntersectionObserver();
  
  // New state for tracking animation progress
  const [animationStep, setAnimationStep] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);
  const timeoutRefs = useRef([]);

  // Combine refs for intersection observer and section reference
  const combinedRef = (element) => {
    sectionRef.current = element;
    intersectionRef(element);
  };

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeoutId => {
      if (timeoutId) clearTimeout(timeoutId);
    });
    timeoutRefs.current = [];
  };

  // Animation sequence with pause/resume capability
  const startAnimationSequence = () => {
    clearAllTimeouts();
    
    const animationDelays = [300, 1000, 3000, 4200, 5400, 6600, 7800, 9000, 10200, 11400, 12600, 13800];
    
    // If animation was paused, resume from where it left off
    const startStep = animationPaused ? animationStep : 0;
    
    // Step 0: Initial visibility
    if (startStep <= 0) {
      const timeout1 = setTimeout(() => {
        if (isActiveSection && isInView) {
          setIsVisible(true);
          setAnimationStep(1);
        }
      }, animationDelays[0]);
      timeoutRefs.current.push(timeout1);
    } else if (startStep === 1) {
      setIsVisible(true);
    }

    // Step 1: Animation completion flag
    if (startStep <= 1) {
      const timeout2 = setTimeout(() => {
        if (isActiveSection && isInView) {
          setAnimationCompleted(true);
          setAnimationStep(2);
        }
      }, animationDelays[1]);
      timeoutRefs.current.push(timeout2);
    } else if (startStep >= 2) {
      setAnimationCompleted(true);
    }

    // Reset animation paused state since we're starting/resuming
    setAnimationPaused(false);
  };

  const pauseAnimation = () => {
    clearAllTimeouts();
    setAnimationPaused(true);
    setIsVisible(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isActiveSection && isInView) {
        // Section is active and in view - play video and respect mute state
        video.muted = isMuted;
        
        // Only play if not already playing
        if (video.paused) {
          video.play().catch((err) => {
            console.warn("Autoplay issue:", err);
          });
        }
        
        // Start or resume animation sequence
        // Start or resume animation sequence
if (!animationCompleted || animationPaused) {
  startAnimationSequence();
} else {
  // If animations already completed and not paused, show immediately
  setIsVisible(true);
}

// Ensure button visibility for immediate user interaction
if (!isVisible && animationCompleted) {
  setIsVisible(true);
}
      } else {
        // Section is not active or not in view - pause video and animation
        if (!video.paused) {
          video.pause();
        }
        pauseAnimation();
      }
    }
  }, [isActiveSection, isInView, isMuted]);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  // Handle mute toggle - specific to this section instance
  const toggleMute = () => {
    const video = videoRef.current;
    if (video && isActiveSection && isInView) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      video.muted = newMutedState;
      
      // Ensure video is playing when unmuting
      if (!newMutedState && video.paused) {
        video.play().catch((err) => {
          console.warn("Play issue:", err);
        });
      }
    }
  };

  const frontendSkills = [
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      color: "#E34F26",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      color: "#1572B6",
    },
    {
      name: "Bootstrap",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      color: "#7952B3",
    },
    {
      name: "Tailwind",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      color: "#06B6D4",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
    },
    {
      name: "ReactJS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      color: "#61DAFB",
    },
  ];

  const backendSkills = [
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      color: "#339933",
    },
    {
      name: "Express.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      color: "#000000",
    },
    {
      name: "SQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      color: "#4479A1",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      color: "#47A248",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      color: "#F05032",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      color: "#ED8B00",
    },
  ];

  return (
    <section
      ref={combinedRef}
      id="skills"
      className="skills-container stack min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 transition-all duration-1000 relative"
    >
      <div>
        {/* Video Background */}
        <div className={`video-wrapper ${isInView ? "fade-in" : ""}`}>
          <video
            ref={videoRef}
            className="background-video"
            loop
            playsInline
            muted={isMuted}
          >
            <source
              src="https://res.cloudinary.com/dnbnst2wn/video/upload/v1748263466/v1_q8qmba.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlays */}
          <div className="gradient-overlay-left"></div>
          <div className="gradient-overlay-top"></div>
        </div>

        <div className={`skills-header ${isVisible ? "fade-in" : ""}`}>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center">
            <GradientText
              colors={[
                "#f79d00",
                "#e8b31e",
                "#b03a00",
                "#4c00ff",
                "#8000ff",
              ]}
              animationSpeed={5}
              showBorder={false}
              className="custom-class font-robert-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold"
            >
              SKILLS
            </GradientText>
          </h2>
        </div>
        

        {/* Skills Content */}
        <div className={`skills-sections ${(isVisible || animationCompleted) ? "skills-visible" : ""}`}>
          {/* Frontend Skills */}
          <div className="skills-section frontend-section">
            <h3 className="skills-section-title frontend-title">Frontend</h3>
            <div className="skills-grid">
              {frontendSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-item frontend-skill skill-item-${index + 1}`}
                  style={{ "--skill-color": skill.color }}
                >
                  <div className="skill-logo">
                    <img src={skill.logo} alt={skill.name} />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="skills-section backend-section">
            <h3 className="skills-section-title backend-title">Backend</h3>
            <div className="skills-grid">
              {backendSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-item backend-skill skill-item-${index + 1}`}
                  style={{ "--skill-color": skill.color }}
                >
                  <div className="skill-logo">
                    <img src={skill.logo} alt={skill.name} />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mute/Unmute Button - Only show when section is active and in view */}
       
{/* Mute/Unmute Button - Show when section is active and in view */}
{/* Mute/Unmute Button - Show when section is active and in view */}
{isActiveSection && isInView && (
  <button
    className={`mute-buttonz ${isVisible ? "button-appear" : "button-hidden"}`}
    onClick={toggleMute}
    aria-label={isMuted ? "Unmute video" : "Mute video"}
  >
            {isMuted ? (
              <svg
                className="mute-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.816a1 1 0 011.617.816zM15.657 8.343a.5.5 0 01.707.707L14.707 10l1.657 1.657a.5.5 0 01-.707.707L14 10.707l-1.657 1.657a.5.5 0 01-.707-.707L13.293 10l-1.657-1.657a.5.5 0 01.707-.707L14 9.293l1.657-1.657z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="unmute-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776a1 1 0 011.617.776z"
                  clipRule="evenodd"
                />
                <path d="M11.199 5.199a.75.75 0 011.06 0A4.5 4.5 0 0114.5 10a4.5 4.5 0 01-2.241 3.901.75.75 0 11-.821-1.258A3 3 0 0013.5 10a3 3 0 00-2.062-2.643.75.75 0 010-1.158z" />
                <path d="M15.199 3.199a.75.75 0 011.06 0A8.5 8.5 0 0118.5 10a8.5 8.5 0 01-2.241 5.801.75.75 0 11-1.06-1.06A7 7 0 0017.5 10a7 7 0 00-2.301-5.199.75.75 0 010-1.06z" />
              </svg>
            )}
          </button>)}
        

        {/* Floating Particles */}
        <div className="particles-container">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${i + 1} ${
                (isVisible || animationCompleted) ? "particle-animate" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;