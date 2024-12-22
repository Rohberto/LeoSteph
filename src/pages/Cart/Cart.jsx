/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../shared/breadCrumbs";
import {DataContext} from "../../context/DataContext";
import generateQuantityOptions from "../../shared/quantityGenerator";
import { calculateCartPrice } from "../../utils/priceCalculator";

const CartPage = () => {
  const navigate = useNavigate();
  const [itemsPrices, setItemsPrices] = useState({});
const {cartdata, products, setCartData} = useContext(DataContext);
console.log(itemsPrices);
  
  const totals = useMemo(() => {
    // Calculate subtotal using the itemPrices object
    const subtotal = Object.values(itemsPrices).reduce((total, value) => total + value, 0);
     const tax = subtotal * 0.07;
    const shipping = subtotal > 200000 ? 0 : 3500;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  }, [cartdata, itemsPrices]);


  
  const handleRemoveItem = (id) => {
   setCartData(prevData => prevData.filter(item => item.id !== id))
  
   localStorage.setItem("cartdata", JSON.stringify(cartdata.filter(item => item.id !== id)));
   delete itemsPrices[id];
  };

  const handleAddMore = () => {
    navigate("/shop");
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        orderSummary: {
          items: cartdata?.length,
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping: totals.shipping,
          total: totals.total,
        },
      },
    });
  };

  return (
    <>
          <div className="max-container bg-white mx-auto min-h-screen py-28 sm:px-6 lg:px-8 font-Roobert changeFontSpacing">
            <Breadcrumbs customPath={["shop", "cart"]} />
            <h1 className="text-3xl font-bold mb-6">Cart</h1>
            {
              cartdata.length ? (
                <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="bg-gray-100 flex justify-between items-center p-4 mb-4 rounded">
                  <p className="text-gray-700">
                    The product has been added to your cart.
                  </p>
                  <button
                    className="bg-green-600 border border-gray-300 rounded px-4 py-2 text-white hover:bg-[#31572C]"
                    onClick={handleAddMore}
                  >
                    Add more Products
                  </button>
                </div>

                {/* Cart Items */}
                <div className="bg-white shadow-md rounded-lg p-4">
                  {cartdata?.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveItem={handleRemoveItem}
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
                      <span>{cartdata?.length}</span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span>Sub Total</span>
                      <span>₦{totals?.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span>Tax</span>
                      <span>₦{totals?.tax?.toLocaleString()}</span>
                    </div>
                    <div className="mb-4 flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {totals.shipping === 0
                          ? "Free"
                          : `₦${totals?.shipping?.toLocaleString()}`}
                      </span>
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
                      <button className="border border-[#4F772D] text-[#011c12] px-3 py-1 rounded hover:bg-[#31572C] hover:text-white" onClick={() => {
                      const isProductInCart = cartdata.find(product => product.id === item.id);
                      if(!isProductInCart){
                      setCartData((prev) => [...prev, item]);
                      localStorage.setItem("cartdata", JSON.stringify([...cartdata, item]));
                    }
                      }}>
                        order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </>
              ) : (
                <h2 className="text-3xl lg:text-4xl  text-center mb-2 font-bold font-MetrischBold changefontspacing">Cart is Empty</h2>
              )
            }
          </div>
    </>
  );
};

export default CartPage;

const CartItem = ({
  item,
  handleRemoveItem,
  updateQuantity,
  setItemsPrices,
}) => {
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
const [orderQuantities, setOrderQuantities] = useState(item?.orderLimit?.min)
  useEffect (() => {

 }, []);
  useEffect(() => {
    const pTotal = calculateCartPrice({
      quantity:
        orderQuantities || item?.quantity,
      fixedQuantity: item.orderLimit.min,
      basePrice: item?.price,
      minQuantity: item?.orderLimit?.min,
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
            src={item?.images[0]}
            alt={item?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            {" "}
            {/* min-w-0 prevents flex item from overflowing */}
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {item.name}
            </h2>
            {/* Mobile Price - Only shown on smaller screens */}
            <p className="text-gray-600 sm:hidden mt-1">
              ₦{itemTotalPrice.toLocaleString()}
            </p>
          </div>
          {/* Delete button aligned to the top right */}
          <button
            className="text-red-500 hover:text-red-700 self-start"
            onClick={() => handleRemoveItem(item.id)}
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
                orderQuantities
              }
              onChange={(e) => setOrderQuantities(e.target.value) }
              className="border rounded px-2 py-1 text-sm w-20"
            >
              {generateQuantityOptions(item.orderLimit).map((num) => (
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
          <h3 className="text-sm font-semibold mb-2">Description:</h3>
         <p className="text-sm py-2 font-Roobert changeFontSpacing">{item.description}</p>
        </div>
      </div>

    </div>
  );
};
