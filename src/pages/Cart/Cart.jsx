import { useEffect, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../shared/breadCrumbs";
import useDataFetching from "../../hooks/useDataFetching";
import {
  addToCart,
  fetchCart as getCart,
  fetchCartUnAuth as getCartUnAuth,
  addToCartUnAuth,
} from "../../services/cart";
import {
  transformApiResponse,
  transformProductsResponse,
} from "../../utils/dataSelectors";
import Loader from "../../shared/loader";
import generateQuantityOptions from "../../shared/quantityGenerator";
import { getAllProducts } from "../../services/products";
import { calculateCartPrice } from "../../utils/priceCalculator";
import { AuthService } from "../../services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import EmptyCart from "./EmptyState";

const CartPage = () => {
  const queryClient = useQueryClient();
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();
  const [orderQuantities, setOrderQuantities] = useState(null);
  const [itemsPrices, setItemsPrices] = useState({});

  const getFetchFunction = () => {
    if (AuthService.isLoggedIn()) return getCart;
    if (cartId) return () => getCartUnAuth(cartId);
    return undefined;
  };

  const { data: carts, isLoading: isLoadingCart } = useDataFetching({
    key: ["carts"],
    fn: getFetchFunction(),
    select: transformApiResponse,
  });
  const { mutate: deleteItemFromCart } = useMutation({
    mutationFn: (id) => {
      return AuthService.isLoggedIn()
        ? addToCart(id, { action: "remove" })
        : addToCartUnAuth(id, { action: "remove", cartId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      toast.success("Item deleted succesfully");
    },
    onError: () => {
      toast.error("SOmething went wrong");
    },
  });

  const { data: products } = useDataFetching({
    key: ["productsPage"],
    fn: getAllProducts,
    select: transformProductsResponse,
  });

  const totals = useMemo(() => {
    // Calculate subtotal using the itemPrices object
    const subtotal =
      carts?.items?.reduce((acc, item) => {
        const itemPrice = itemsPrices[item.id] || 0;
        return acc + itemPrice;
      }, 0) || 0;

    const shipping = 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [carts, itemsPrices]);

  const updateQuantity = (id, newQuantity) => {
    setOrderQuantities((prev) => ({ ...prev, [id]: parseInt(newQuantity) }));
  };

  const handleRemoveItem = async (id) => {
    deleteItemFromCart(id);
  };

  const handleAddMore = () => {
    navigate("/shop");
  };

  const handleCheckout = () => {
    if (carts?.items?.length === 0) return;
    if (!AuthService.isLoggedIn()) {
      navigate("/sign-in");
      return;
    }
    navigate("/checkout", {
      state: {
        orderSummary: {
          items: carts?.items.length,
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          total: totals.total,
          cart_id: carts?.id,
        },
      },
    });
  };

  return (
    <>
      {!isLoadingCart ? (
         carts?.items?.length > 0 ? (
        <>
          <div className="max-container bg-white mx-auto min-h-screen py-28 sm:px-6 lg:px-8">
            <Breadcrumbs customPath={["shop", "cart"]} />
            <h1 className="text-3xl font-bold mb-6">Cart</h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="bg-gray-100 flex justify-between items-center p-4 mb-4 rounded">
                  <p className="text-gray-700">
                    The product has been added to your cart.
                  </p>
                  <button
                    className="bg-green-600 border border-gray-300 rounded px-4 py-2 text-[#011c12] hover:bg-[#31572C]"
                    onClick={handleAddMore}
                  >
                    Add more Products
                  </button>
                </div>

                {/* Cart Items */}
                <div className="bg-white shadow-md rounded-lg p-4">
                  {carts?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                      updateQuantity={updateQuantity}
                      orderQuantities={orderQuantities}
                      setItemsPrices={setItemsPrices}
                    />
                  ))}
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="border p-4 rounded mb-4">
                  <h2 className="font-semibold mb-4 text-center">
                    Order Summary
                  </h2>
                  <div>
                    <div className="mb-4 flex justify-between">
                      <span>Items</span>
                      <span>{carts?.items.length}</span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span>Sub Total</span>
                      <span>₦{totals?.subtotal?.toLocaleString()}</span>
                    </div>

                    <div className="mb-4 flex justify-between">
                      <span>Shipping</span>
                      <span>{totals.shipping === 0 ? "N/A" : `₦${totals.shipping}`}</span>
                    </div>
                    <div className="mb-2 flex justify-between font-bold border-t pt-4">
                      <span>Total</span>
                      <span>₦{totals?.total?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-1/2"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                  <h2 className="font-semibold mb-4">
                    Instantly add these products to your cart
                  </h2>
                  {products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mb-4 last:mb-0"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item?.images[0]}
                          alt={item?.name}
                          className="w-12 h-12 object-cover"
                        />
                        <div>
                          <p className="font-medium">{item?.name}</p>
                          <p className="text-gray-600 font-medium">
                            ₦{item?.price.toLocaleString()} per{" "}
                            <span className="font-semibold">
                              {item?.orderLimit?.min}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        className="border border-[#4F772D] text-[#011c12] px-3 py-1 rounded hover:bg-[#31572C] hover:text-white"
                        onClick={() =>
                          navigate(`/shop/${item.name}`, {
                            state: { product: item },
                          })
                        }
                      >
                        Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )
    ) : (
        <Loader />
      )}
    </>
  );
};

export default CartPage;

const CartItem = ({
  item,
  orderQuantities,
  handleRemoveItem,
  updateQuantity,
  setItemsPrices,
}) => {
  const [itemTotalPrice, setItemTotalPrice] = useState(0);

  useEffect(() => {
    const pTotal = calculateCartPrice({
      quantity:
        (orderQuantities && orderQuantities[item?.id]) || item?.quantity,
      fixedQuantity: item?.quantity,
      basePrice: item?.product?.price,
      minQuantity: item?.product?.orderLimit?.min,
      previousTotalPrice: item.price,
    });
    setItemTotalPrice(pTotal.totalPrice);
    setItemsPrices((prev) => ({ ...prev, [item.id]: pTotal.totalPrice }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, orderQuantities]);

  return (
    <div className="mb-6 pb-6 border-b last:border-b-0">
      {/* Main Item Container */}
      <div className="flex flex-col w-full">
        {/* Product Header - Image and Basic Info */}
        <div className="flex gap-4 mb-4">
          <img
            src={item?.product?.images[0]}
            alt={item?.product?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* min-w-0 prevents flex item from overflowing */}
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {item?.product?.name}
            </h2>
            {/* Mobile Price - Only shown on smaller screens */}
            <p className="text-gray-600 sm:hidden mt-1">
              ₦{itemTotalPrice.toLocaleString()}
            </p>
          </div>
          {/* Delete button aligned to the top right */}
          <button
            className="text-red-500 hover:text-red-700 self-start"
            onClick={() => handleRemoveItem(item.product.id)}
          >
            <FaTrash size={18} />
          </button>
        </div>

        {/* Controls Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Qty:</label>
            <select
              value={
                (orderQuantities && orderQuantities[item.id]) || item.quantity
              }
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="border rounded px-2 py-1 text-sm w-20"
            >
              {generateQuantityOptions(item.product?.orderLimit).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Price - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-500">Price:</span>
            <span className="font-semibold">
              ₦{itemTotalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        {/* Specifications */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {item.specifications &&
              Object.entries(item.specifications).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium">{value.name}:</span>{" "}
                  {value.value}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};