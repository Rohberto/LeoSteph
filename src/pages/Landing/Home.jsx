/* eslint-disable react/prop-types */

import FeaturedProducts from "./Featured";
import ProductReviews from "./Services/reviews";
import WhyChooseUs from "./Services/details";
import PrintingServices from "./Services/service";
import ClientCarousel from "./Services/brand";
import Banner from "../../components/Banner/Banner";

const HomeLayout = ({ children }) => (
  <div className="max-w-container mx-auto">{children}</div>
);

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <HomeLayout>
        <FeaturedProducts />
      </HomeLayout>
      <PrintingServices />
      <HomeLayout>
        <WhyChooseUs />
      </HomeLayout>
      <HomeLayout>
        <ProductReviews />
      </HomeLayout>
      <ClientCarousel />
    </div>
  );
};

export default Home;
