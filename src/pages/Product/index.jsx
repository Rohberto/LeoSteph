import { useEffect, useState } from "react";
import ProductCard from "./Card";
import { getAllProducts } from "../../services/products";
import useDataFetching from "../../hooks/useDataFetching";
import { transformProductsResponse } from "../../utils/dataSelectors";
import Loader from "../../shared/loader";
import Breadcrumbs from "../../shared/breadCrumbs";
import Category from "../../components/Page/shop/shopBy/Category";
import ProductBanner from "../../components/Page/shop/ProductBanner";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  const { data: products, isLoading } = useDataFetching({
    key: ["productsPage"],
    fn: getAllProducts,
    select: transformProductsResponse,
  });

  const categories = [
    "All",
    ...new Set(products?.map((product) => product.category.name)),
  ];

  useEffect(() => {
    if (categoryFromUrl && products) {
      const decodedCategory = decodeURIComponent(categoryFromUrl);
      const categoryExists = products.some(
        (product) => product.category.name === decodedCategory
      );
      if (categoryExists) {
        setSelectedCategory(decodedCategory);
      } else {
        setSelectedCategory("All");
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("category");
        window.history.pushState({}, "", `?${newSearchParams.toString()}`);
      }
      setItemOffset(0);
    }
  }, [categoryFromUrl, products, searchParams]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setItemOffset(0);
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", encodeURIComponent(category));
    }
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
  };

  const sortProducts = (products) => {
    if (!products) return [];
    const sortedProducts = [...products];

    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "popular":
        // Sort by isPopular (true items first) and then by price as secondary sort
        return sortedProducts.sort((a, b) => {
          if (a.isPopular === b.isPopular) {
            // If both items have same popularity, sort by price
            return b.price - a.price;
          }
          // Put popular items first
          return b.isPopular ? 1 : -1;
        });
      default:
        return sortedProducts;
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setItemOffset(0); // Reset to first page when sorting changes
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setItemOffset(0); // Reset to first page when items per page changes
  };

  // Filter and sort products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products?.filter(
          (product) => product.category.name === selectedCategory
        );

  const sortedProducts = sortProducts(filteredProducts);

  // Calculate pagination
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProducts?.slice(itemOffset, endOffset) || [];
  const pageCount = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % (sortedProducts?.length || 0);
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col min-h-screen font-Roobert changeFontSpacing">
      <div className="mt-12 pb-36 max-container">
        <Breadcrumbs />
        <div className="flex flex-col md:flex-row gap-10">
          {/* Shop Side Nav with Categories */}
          <div className="w-full md:w-1/5 hidden md:block">
            <div className="sticky top-24">
              <Category
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                icons={false}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-4/5">
            {/* Mobile Category Select */}
            <div className="md:hidden mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {categories?.map((category, index) => (
                  <option key={index} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Header and Banner */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold uppercase">
                  {selectedCategory}
                </h1>
              </div>

              <ProductBanner
                itemsPerPageFromBanner={handleItemsPerPageChange}
                onSortChange={handleSortChange}
                currentSort={sortBy}
              />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="mb-8">
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-6">
                  {currentItems.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(p) =>
                        console.log(`Added ${p.name} to cart`)
                      }
                      onAddToFavorites={(p) =>
                        console.log(`Added ${p.name} to favorites`)
                      }
                      className="w-full max-w-sm mx-auto"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {sortedProducts?.length > 0 ? (
                  <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-8">
                    <ReactPaginate
                      nextLabel=""
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={pageCount}
                      previousLabel=""
                      pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                      pageClassName="mr-6"
                      containerClassName="flex text-base font-semibold font-titleFont py-10"
                      activeClassName="bg-black text-white"
                    />

                    <p className="text-base font-normal text-lightText">
                      Products from {itemOffset + 1} to{" "}
                      {Math.min(endOffset, sortedProducts.length)} of{" "}
                      {sortedProducts.length}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center mt-8">
                    <p className="text-xl font-bold text-gray-600">
                      No products found.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
