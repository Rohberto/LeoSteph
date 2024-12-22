import { useState, useMemo, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import get from "../../services/Admin/get";
import ProductCard from "../Product/Card";
import useDataFetching from "../../hooks/useDataFetching";
import { getAllProducts } from "../../services/products";
import { transformProductsResponse } from "../../utils/dataSelectors";
import capitalizeFirstLetter from "../../utils/capital";
import { DataContext } from "../../context/DataContext";
// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: get.getAllCategories,
  });
  const {setProducts} = useContext(DataContext);
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useDataFetching({
    key: ["productsPage"],
    fn: getAllProducts,
    select: transformProductsResponse,
  });
useEffect(() => {
  setProducts(products);
}, [products]);
  const categories = useMemo(
    () => [{ id: "all", name: "All" }, ...(categoriesData?.data || [])],
    [categoriesData]
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "all") {
      return shuffleArray([...products]).slice(0, 8);
    }
    return products.filter(
      (product) => product.category.id === selectedCategory
    );
  }, [products, selectedCategory]);

  if (isCategoriesLoading || isProductsLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (categoriesError || productsError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading data. Please try again later.
      </div>
    );
  }




  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl lg:text-4xl  text-center mb-2 font-bold font-MetrischBold changefontspacing">Featured Products</h2>
      <p className="text-center text-sm text-gray-500 mb-6 font-Roobert changefontspacing">
        PRINTING MADE EASY
      </p>

      {/* Categories Tab */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 mb-8 font-Roobert changefontspacing">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm border rounded-full transition-colors duration-300 ${
              category.id === selectedCategory
                ? "bg-black text-white border-black"
                : "text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {capitalizeFirstLetter(category.name)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToFavorites={() => {}}
          />
        ))}
      </div>

      {/* No products message */}
      {filteredProducts.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          No products found in this category.
        </p>
      )}

      {/* View more button */}
      <div className="text-center mt-8">
        <button
          className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-Roobert changefontspacing"
          onClick={() => (window.location.href = "/shop")}
        >
          View more →
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
