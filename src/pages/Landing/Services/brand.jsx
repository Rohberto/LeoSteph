/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
} from "../../../constant/images/index";

const ClientCarousel = () => {
  const clients = [
    { name: "one", logo: one },
    { name: "two", logo: two },
    { name: "three", logo: three },
    { name: "four", logo: four },
    { name: "five", logo: five },
    { name: "six", logo: six },
    { name: "seven", logo: seven },
    { name: "eight", logo: eight },
    { name: "nine", logo: nine },
    { name: "ten", logo: ten },
    { name: "eleven", logo: eleven },
    { name: "twelve", logo: twelve },
    { name: "thirteen", logo: thirteen },
  ];

  // Text animation variant
  const textVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.07,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Words to highlight with special effects
  const highlightedWords = ["ideas", "designs", "precision"];

  return (
    <section
      aria-label="Client partners"
      className="py-10 md:py-16 bg-white overflow-hidden font-Roobert changefontspacing"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
        >
          {/* Title Animation */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 md:w-1/2 leading-tight"
            style={{ lineHeight: "1.2" }}
            variants={textVariant}
            custom={1}
          >
            {`Transforming  ideas  into  impactful  designs  with precision  and  quality.`
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-1 ${
                    highlightedWords.includes(word.toLowerCase())
                      ? "text-green-500 special-effect"
                      : ""
                  }`}
                  custom={index}
                  variants={textVariant}
                >
                  {word}
                </motion.span>
              ))}
          </motion.h2>

          {/* Subtitle Animation */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 md:w-1/2 px-2 sm:px-0"
            variants={textVariant}
            custom={2}
          >
            {`From business cards to large-scale prints, our commitment to quality and customer-focused service ensures every project brings our clients' visions to life, effectively and efficiently.`
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-1 ${
                    highlightedWords.includes(word.toLowerCase())
                      ? "text-green-500 special-effect"
                      : ""
                  }`}
                  custom={index}
                  variants={textVariant}
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>
        </motion.div>

        {/* Scrolling Logos Section */}
        <div className="relative mt-10 md:mt-12">
          <motion.div className="flex overflow-hidden relative">
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`client-${index}`}
                  className="flex items-center justify-center min-w-[80px] sm:min-w-[120px] md:min-w-[160px] lg:min-w-[200px] mx-2 sm:mx-4"
                >
                  <motion.div
                    className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 transition-transform duration-300 transform hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="h-full w-full object-contain"
                      style={{ maxHeight: "60px", maxWidth: "120px" }}
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CSS for special effect */}
      <style>{`
        .text-green-500 {
          color: #2f855a;
        }
        .special-effect {
          position: relative;
          animation: pulse 2s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientCarousel;
