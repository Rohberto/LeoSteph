/* eslint-disable react/no-unescaped-entities */
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  {
    id: 1,
    text: "Needed to get some print jobs done urgently and I reached out to leosteph, he didn't only deliver, he did it excellently",
    name: "Eotwilliam Limited",
  },
  {
    id: 2,
    text: "You can never go wrong with Leosteph Graphix Print. They bring your ideas to life with fabulous designs anytime, anyday. Amazing and unique non-repetitive designs are their style. A tested and trusted brand.",
    name: "Peace Ukpong",
  },
  {
    id: 3,
    text: "Your work is very neat and clear. And you have great customer service. Keep it up. Well done Leosteph Graphics.",
    name: "Elizabeth Obene",
  },
  {
    id: 4,
    text: "In a nutshell, Leosteph, is a trusted brand and it is a brand that will definitely stay for a very long time. They have a touch of excellence in all their works. My goodness!!",
    name: "Delight Ekemekwe",
  },
  {
    id: 5,
    text: "It's amazing how they are able to effectively and swiftly deliver what you need, even when the situation is hard for you. Leosteph graphix is the way to go. I got my design printed and fulfilled without stress. More thanks to their warm customer service. Don't hesitate to give a try!! You'll not be disappointed.",
    name: "Oluwatobiloba Onaolapo",
  },
  {
    id: 6,
    text: "Absolutely amazing services! Delivers promptly, pays rapt attention to details... Leosteph is good Abegggg!",
    name: "Winny Anny",
  },
  {
    id: 7,
    text: "Indeed they do have the Midas touch. In the world of Graphics design and prints, they stand in a galaxy of their own. This is indeed vintage beyond imitation…perfection extraordinaire",
    name: "Ogwumike Stephen",
  },
  {
    id: 8,
    text: "Super creative company to work with, exceptional customer service skill, takes the notch higher than your expectation!",
    name: "Ginikachukwu Obinna-Okorie",
  },
  {
    id: 9,
    text: "I wanted to let you know how thrilled I am with the product I got from you. It's truly outstanding and exceeded my expectations. The attention to detail and quality are exceptional. Your customer service was top-notch too. Looking forward to my next purchase!",
    name: "Isabella Martins",
  },
  {
    id: 10,
    text: "Hired Leosteph Graphix for a wedding card, I was impressed by their creativity and quick delivery. Kudos!",
    name: "Mary Chukwu",
  },
  {
    id: 11,
    text: "Fantastic service delivery and value for money. The print was very sharp and the banner work and brochure was excellent. Great job from Leosteph Graphix",
    name: "Blaise Ibe",
  },
  {
    id: 12,
    text: "Leosteph has always been my best choice when it comes to professionalism. They are very time-conscious. More deals to come.",
    name: "Patrick Real",
  },
  {
    id: 13,
    text: "Leosteph Graphix is sure plug.. your services to NAFSTS has been top-notch, always give the best and on time.. we will always knock on your door because you are the best. More grace.",
    name: "Chigozie Nelson Ijioma",
  },
];

const ProductReviews = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto px-4 ">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-indigo-600 font-semibold mb-2 font-Roobert changefontspacing">TESTIMONIALS</h4>
          <h2 className="text-3xl lg:text-4xl md:text-xl font-bold text-gray-900 mb-4 font-MetrischBold changefontspacing">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 font-Roobert changefontspacing">
            Discover why leading brands choose us for their creative needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Slider {...settings}>
            {testimonialData.map((data) => (
              <div key={data.id} className="px-4 py-2">
                <motion.div
                  className="bg-white rounded-2xl shadow-lg p-8 h-full relative overflow-hidden hover:shadow-xl transition-shadow duration-300 font-Roobert changefontspacing"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col h-full">
                    <blockquote className="text-gray-600 italic text-bold  mb-6 line-clamp-4">
                      "{data.text}"
                    </blockquote>
                    <div className="mt-auto">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {data.name}
                      </h3>
                    </div>
                    <div className="absolute top-6 right-8 text-indigo-200 opacity-50">
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductReviews;
