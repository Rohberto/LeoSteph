import React, { useEffect, useState } from "react";
import "./preloader.css";
import gsap from "gsap";

const Preloader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate top and bottom text to skew and appear from below
    tl.fromTo(
      ".preloader-top-text span",
      { y: 50, skewY: 10, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    )
      .fromTo(
        ".preloader-bottom-text span",
        { y: 50, skewY: 10, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        "-=0.6" // Overlap this animation slightly
      )
      .call(() => {
        // Start progress bar animation after text appears
        let intervalId = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(intervalId);
              // Text disappears and preloader closes
              tl.to(".preloader-top-text span, .preloader-bottom-text span", {
                opacity: 0,
                y: -50,
                duration: 0.5,
                stagger: 0.2,
              })
                .to("#percent, #bar", { opacity: 0, duration: 0.2 })
                .to("#preloader", { width: "0%", duration: 0.8 });
              return prev;
            }
            return prev + 1;
          });
        }, 200);
      });
  }, []);

  return (
    <div id="preloader">
      <div className="preloader-top-text">
        <p><span>Crafting Perfection</span></p>
        <p><span>One Print at a Time.</span></p>
        <p><span>Leostep Printing Press</span></p>
        <p><span>Your Vision, Our Print.</span></p>
      </div>
      <div id="bar">
        <div id="percent">{progress}%</div>
        <div id="bar-confirm" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="preloader-bottom-text">
        <p><span>Loading your perfect prints...</span></p>
      </div>
    </div>
  );
};

export default Preloader;
