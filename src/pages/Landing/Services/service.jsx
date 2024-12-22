/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import { Printer, Palette, Award, Layers, PenTool } from "lucide-react";
import { wide } from "../../../constant/images/index";

const PrintingServices = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <main className="bg-[#E8E4E0] dark:bg-[#0D2B1D] min-h-screen relative overflow-hidden">
      {/* SEO-optimized metadata */}
      <header className="sr-only">
        <h1>
          Professional Printing Services - Custom Design & Branding Solutions
        </h1>
        <p>
          Discover top-notch printing, branding, and creative design services
          tailored to meet your unique needs. Experience over a decade of
          excellence in delivering innovative solutions.
        </p>
      </header>

      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8BE75]/10 via-transparent to-[#345635]/10 dark:from-[#345635]/20 dark:to-[#0D2B1D]/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D8BE75] dark:text-slate-100 tracking-tight relative inline-block "
            >
              <span className="relative font-Roobert changefontspacing">
                ABOUT US
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-[#345635]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h2>

            <motion.div className="space-y-6" {...fadeIn}>
              <p className="text-slate-700 dark:text-slate-200 text-lg sm:text-xl font-medium leading-relaxed font-Roobert changefontspacing">
                We specialize in crafting premium printing services, innovative
                branding solutions, and professional designs to elevate your
                business presence.
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-6 font-Roobert changefontspacing">
                {[
                  {
                    icon: <Printer />,
                    title: "Premium Printing",
                    text: "High-quality printing for all business needs.",
                  },
                  {
                    icon: <Award />,
                    title: "Expert Design",
                    text: "Professional designs tailored to your brand.",
                  },
                  {
                    icon: <Palette />,
                    title: "Creative Solutions",
                    text: "Innovative branding strategies to stand out.",
                  },
                  {
                    icon: <Layers />,
                    title: "Custom Packaging",
                    text: "Unique packaging designs for your products.",
                  },
                  {
                    icon: <PenTool />,
                    title: "Logo Creation",
                    text: "Custom logos for a lasting impression.",
                  },
                  {
                    icon: <Printer />,
                    title: "Large Format Printing",
                    text: "Banners, posters, and more for impactful displays.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-[#345635] backdrop-blur-sm p-4 rounded-lg shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="text-[#345635] dark:text-[#D8BE75] mb-2"
                      style={{ fontSize: "24px" }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-slate-800 dark:text-white font-semibold mb-2 text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 font-Roobert changefontspacing">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  With over a decade of experience, our team has transformed
                  countless brands with creative excellence and strategic
                  insights. From business cards to large-scale branding, we
                  deliver beyond expectations.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Trust us to bring your vision to life with precision and
                  creativity, making your business stand out in a competitive
                  market.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Right column - Image section */}
          <motion.section
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative accent */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 sm:w-24 h-48 sm:h-72 bg-[#D8BE75]/20 rounded-l-3xl -mr-4 backdrop-blur-sm"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* Image container */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative  w-full rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-[#345635]">
                <img
                  src={wide}
                  alt="Modern printing workspace showcasing our professional equipment and design environment"
                  className="object-cover w-full h-full "
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

                {/* Image caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm bg-gradient-to-t from-slate-900/70 to-transparent">
                  <p className="font-medium">
                    Our state-of-the-art printing facility
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default PrintingServices;
