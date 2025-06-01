import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import BlurText from "./BlurText.jsx";
import GradientText from "./GradientText";
import "./About.css";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const handleResumeDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1EqdXIjHs-C1FpMaQioFMyTmr44Ok6A-z'; // Replace with your resume file path
    link.download = 'Bhargav_Kundrapu_Resume.pdf'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={sectionRef} id="about" className="min-h-screen w-screen overflow-x-hidden stack">
      <div className="stacking-section min-h-screen w-full bg-[#000] flex flex-col md:flex-row items-center justify-center py-4 sm:py-6 md:py-8 lg:py-0">
        {/* left part */}
        <div className="brightness-50  md:order-1 w-full h-48 sm:h-64 lg:w-1/2 md:h-80 lg:h-96 xl:w-1/2 xl:h-2/5 flex flex-col items-center justify-center md:justify-end px-2 sm:px-4">
          <img 
            src="https://res.cloudinary.com/dnbnst2wn/image/upload/v1748801404/WhatsApp_Image_2025-06-01_at_20.54.38_aa4d0f94_dcylgd.jpg" 
            alt="profilepic" 
            className="w-1/2 max-h-full object-contain"
          />                        
        </div>

        {/* right part */}
        <div className="order-1 md:order-2 w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-0">
          {/* main container */}                     
          <div className="h-full w-full">
            {/* about me text */}
            <div className="flex items-center justify-start mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <div>
                <GradientText
                  colors={[
                    "#4c00ff",
                    "#8000ff",
                    "#f79d00",                                         
                    "#e8b31e",
                    "#b03a00",
                  ]}
                  animationSpeed={9}
                  showBorder={false}
                  className="custom-class font-robert-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold"
                >
                  About Me
                </GradientText>
              </div>
            </div>

            {/* whole about me text */}
            <div className="flex-col items-start justify-start space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              <p className="font-robert-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-metallic-gray leading-snug sm:leading-normal md:leading-relaxed">
                Greetings! I'm{" "}
                <span className="text-blue-tint">Bhargav Kundrapu</span> a Digital Experience Architect who thrives on transforming wild ideas into interactive realities.
              </p>

              <p className="font-robert-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-metallic-gray leading-snug sm:leading-normal md:leading-relaxed">
                I'm diving into the world of{" "}
                <span className="text-blue-tint">Artificial Intelligence</span>{" "}
                to add smarter features to websites. It's all about making web
                apps more helpful and responsive in simple ways.
              </p>

              <p className="font-robert-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-metallic-gray leading-snug sm:leading-normal md:leading-relaxed">
                <span className="text-blue-tint">My philosophy is simple-</span>{" "}
                every line of code should tell a story, every interaction should spark joy, and every application should feel less like software and more like magic. Whether I'm optimizing database queries at 2 AM or sketching wireframes over morning coffee, I'm always chasing that perfect moment when technology becomes invisible and user delight takes center stage.
              </p>

              {/* Resume Download Button */}
              <div className="flex justify-start pt-2 sm:pt-3 md:pt-4">
                <button
                  onClick={handleResumeDownload}
                  className="bg-blue-tint hover:bg-blue-600 text-white font-robert-medium text-xs sm:text-sm md:text-base lg:text-lg px-4 py-0 sm:px-6 sm:py-3 rounded-lg transition-colors duration-300 ease-in-out"
                >
                  Download Resume
                </button>
              </div>

              <div className="flex justify-center sm:justify-end ">
                <span className="font-robert-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white">
                  -Bhargav Kundrapu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;