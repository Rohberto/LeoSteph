import { motion } from "framer-motion";
import {
  delivery,
  quality,
  support,
  equipment,
  affordable,
  widerange,
} from "../../../constant/images/index";
const features = [
  {
    title: "High-Quality Output",
    description:
      "We take pride in the commitment to high-quality print and branding materials that meet world standards for excellence. Our focus on quality ensures your brand stands out and leaves a lasting impression.",
    image: quality,
  },
  {
    title: "Timely Delivery",
    description:
      "We understand the importance of time in business. That’s why we ensure every project is completed and delivered on schedule, without compromising the quality you deserve.",
    image: delivery,
  },
  {
    title: "Wide Range of Services",
    description:
      "Professional graphic design services tailored to your unique brand identity and vision.From business cards, banners, and corporate souvenirs to vehicle wraps, branded clothing, and more, we offer a comprehensive suite of services to cater to all your branding needs.",
    image: widerange,
  },
  {
    title: "Affordable Pricing",
    description:
      "We offer competitive pricing that delivers excellent value for money. We ensure you get premium quality without stretching your budget.",
    image: affordable,
  },
  {
    title: "State-of-the-Art Equipment",
    description:
      "We use the latest technology and modern equipment to ensure precision, durability, and the highest quality in all our print and branding projects.",
    image: equipment,
  },
  {
    title: "Exceptional Customer Service",
    description:
      "We prioritize your satisfaction by providing personalized attention, quick responses, and ongoing support throughout the project.",
    image: support,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
    },
  },
};

const WhyChooseUs = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-slate-800 font-MetrischBold changefontspacing">
            Why Print with Us
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-Roobert changefontspacing">
            Your trusted partner in professional printing and strategic branding
            solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 font-Roobert changefontspacing"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
