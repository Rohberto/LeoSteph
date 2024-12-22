/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ISlider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows";

const Slider = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <ISlider {...settings}>
      {items?.map((item) => (
        <div key={item._id} className="flex flex-col items-center">
          <p className="text-center text-2xl font-medium my-2">{item.name}</p>
          <div className="h-[10rem] flex justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-full  object-cover rounded-md"
            />
          </div>
        </div>
      ))}
    </ISlider>
  );
};

export default Slider;
