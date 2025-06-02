import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCards";


const pro = [
  {
    image: "https://res.cloudinary.com/dnbnst2wn/image/upload/v1748797641/WhatsApp_Image_2025-06-01_at_22.26.23_b7a1d984_hv6yjo.jpg",
    title: "Ooty travels - FrontEnd",
    description:
      "Your complete Ooty travel companion offering reliable cab services, curated tour packages, expert local guides, and personalized sightseeing experiences in the Queen of Hill Stations.",
    demoLink: "https://ootytravels1-1.vercel.app/",
    codeLink: "https://github.com/bhargavkundrapu/Oootytourismwebsitemain",
  },
  {
    image: "https://res.cloudinary.com/dnbnst2wn/image/upload/v1748797641/WhatsApp_Image_2025-06-01_at_22.26.22_8b5ee488_dlw0zr.jpg",
    title: "Nxttrendz- E-commerce clone",
    description:
      "A modern ecommerce platform featuring product browsing, shopping cart functionality, and seamless online shopping experience with contemporary design and user-friendly interface.",
    demoLink: " http://nxttrendxkbs6.ccbp.tech/",
    codeLink: "https://github.com/bhargavkundrapu/new",
  },
  {
    image: "https://res.cloudinary.com/dnbnst2wn/image/upload/v1748797641/WhatsApp_Image_2025-06-01_at_22.26.22_6a183f50_gfrj8y.jpg",
    title: "Wikipedia Clone - Frontend,API's",
    description:
      "A Wikipedia-inspired knowledge platform offering organized article browsing, search functionality, and structured information display for seamless learning and research.",
    demoLink: " http://wikepediaclone.ccbp.tech/",
    codeLink: "https://github.com/bhargavkundrapu/newwebsite",
  },
  {
    image: "https://res.cloudinary.com/dnbnst2wn/image/upload/v1748797986/WhatsApp_Image_2025-06-01_at_22.42.55_b3540498_zyyhnc.jpg",
    title: "TodoList",
    description:
      "A clean and intuitive todo list application for organizing daily tasks, tracking progress, and boosting productivity with user-friendly task management features.",
    demoLink: "http://maketoday.ccbp.tech/ ",
    codeLink: "https://github.com/bhargavkundrapu/todowebsite",
  },
  {
    image: "https://res.cloudinary.com/dnbnst2wn/image/upload/v1748797641/WhatsApp_Image_2025-06-01_at_22.26.23_0cb05410_yoqmbl.jpg",
    title: "Foodmunch website",
    description: "A comprehensive food discovery platform showcasing restaurant dishes, social dining experiences.",
    demoLink: "https://foodhandiness.ccbp.tech/",
    codeLink: "https://github.com/bhargavkundrapu/foodhandiness",
  },
  /*
  {
    image: todo,
    title: "Todo List",
    description: "Minimalist Neumorphic To-Do List with a stylish soft UI.",
    demoLink: "https://vishvjeet-rana.github.io/To-Do-List-JavaScript/",
    codeLink: "https://github.com/Vishvjeet-Rana/To-Do-List-JavaScript",
  },
  {
    image: ecom,
    title: "Ecommerce-site FrontEnd",
    description:
      "eCommerce frontend inspired by Amazon, built with React and Tailwind for a seamless shopping experience",
    demoLink: "https://vishvjeet-rana.github.io/E-commerce-static-website/",
    codeLink: "https://github.com/Vishvjeet-Rana/E-commerce-static-website",
  },
  {
    image: simonsays,
    title: "Simon Says Game",
    description:
      "Classic Simon Says game with interactive and engaging gameplay.",
    demoLink: "https://vishvjeet-rana.github.io/Simon-Says-Game/",
    codeLink: "https://github.com/Vishvjeet-Rana/Simon-Says-Game",
  },*/
];

const Carousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-[70vw]   ml-auto flex items-center justify-center">
        
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {pro.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-alpine-frost text-carbon-mist p-2 rounded-full shadow-lg hover:bg-[#7d7d81] transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-alpine-frost text-carbon-mist p-2 rounded-full shadow-lg hover:bg-[#7d7d81] transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
