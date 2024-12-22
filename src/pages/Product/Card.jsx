/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useContext } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { addToCart } from "../../services/cart";
const ProductCard = ({ product, onAddToFavorites }) => {
  const { price, name, images } = product;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    onAddToFavorites(product);
  };

  const handleViewProductDetails = (e) => {
    e.stopPropagation();
    navigate(`/shop/${product.name}`, { state: { product } });
  };

  const {setCartData, cartdata} = useContext(DataContext);
  const addProductToCart = (e, product) => {
    e.stopPropagation();
    const isProductInCart = cartdata.find(item => item.id === product.id);
    if(!isProductInCart){
    setCartData((prev) => [...prev, product])
  localStorage.setItem("cartdata", JSON.stringify([...cartdata, product]));
  }
}

  return (
    <div
      className="group relative max-w-sm shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={handleViewProductDetails}
      role="button"
      aria-label={`View details of ${name}`}
    >
      {/* Heart Icon for Favorite */}
      <div
        className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-red-100"
        onClick={handleFavorite}
        role="button"
        aria-label={`${
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }`}
      >
        <Heart
          className={`h-5 w-5 transition-colors duration-300 ${
            isFavorite ? "text-red-600" : "text-gray-400"
          }`}
        />
      </div>

      {/* Product Image */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <img
          src={images[0] || "https://via.placeholder.com/150"}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 p-4">
        <h3 className="text-lg text-gray-700 font-bold font-MetrischBold changefontspacing">
          {name}
        </h3>
        <div className="mt-1 text-gray-500 font-Roobert changefontspacing">
          ₦{price.toLocaleString()}
        </div>
      </div>

      {/* Footer Section */}
      <div className="my-4 flex items-center justify-between px-4 ">
        <div className="bg-green-800 px-3 py-2 text-sm font-medium text-white font-Roobert changefontspacing">
          MOQ: per 100 unit(s)
        </div>
     
          <div
            className="rounded-full border-2 border-green-800 p-2 mr-2 hover:bg-green-800 hover:text-yellow-200"
            role="button"
            aria-label="Add to cart"
            onClick={(event) => addProductToCart(event, product)}
          >
            <ShoppingCart
              className="h-5 w-5"
            />
          </div>
      
      </div>

      {/* Mobile View Details Button */}
      {isMobile && (
        <button
          className="mt-4 w-full  bg-green-800 py-4 text-sm font-Roobert changefontspacing text-white hover:bg-green-700"
          onClick={handleViewProductDetails}
        >
          View Details
        </button>
      )}

      {/* Highlight Effect */}
      <div className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-br from-yellow-200 to-green-300 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
    </div>
  );
};

export default ProductCard;
