import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BsCheckCircleFill, BsLightningCharge, BsTruck } from "react-icons/bs";
import Breadcrumbs from "../../shared/breadCrumbs";
import notify from "../../utils/notify";
import { transformSpecificationObject } from "../../utils/dataSelectors";
import "./product.css";

const ProductDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, specification } = location.state;

  const {
    images,
    name,
    price,
    description,
    intro,
    tags = [],
    addOns = [],
    orderLimit = {},
  } = product;

console.log(addOns);

  const minQuantity = orderLimit.min || 1;
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images?.[0]);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [shippingOption, setShippingOption] = useState("standard");

  const calculatePrice = (minQuantity, basePrice, quantity, addOns) => {
    const unitPrice = basePrice / minQuantity;
    let totalPrice = unitPrice * quantity;

    Object.values(addOns).forEach((addOn) => {
      if (addOn?.price) {
        const addOnUnitPrice = addOn.price / minQuantity;
        totalPrice += addOnUnitPrice * quantity;
      }
    });

    if (quantity >= 500 && quantity < 1000) {
      totalPrice *= 0.9;
    } else if (quantity >= 1000) {
      totalPrice *= 0.85;
    }

    return totalPrice;
  };

  const cartPrice = calculatePrice(
    minQuantity,
    price,
    quantity,
    selectedAddOns
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setQuantity(product.orderQuantity || minQuantity);
    }
  }, [product, minQuantity]);

  useEffect(() => {
    const initialAddOns = {};
    if (specification) {
      Object.values(specification).forEach((value) => {
        initialAddOns[value.name] = value.selectedValue;
      });
    } else {
      addOns.forEach((addOn) => {
        if (addOn.values.length > 0) {
          initialAddOns[addOn.name] = addOn.values[0];
        }
      });
    }
    setSelectedAddOns(initialAddOns);
  }, [specification, addOns]);

  const handleAddOnSelect = (addOnName, selectedValue) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addOnName]: addOns
        .find((addOn) => addOn.name === addOnName)
        .values.find((val) => val.tag === selectedValue),
    }));
  };

  const generateQuantityOptions = (orderLimit) => {
    const { min, max } = orderLimit;
    const options = [];
    let currentValue = min;

    while (currentValue <= max) {
      options.push(currentValue);
      if (currentValue < 500) {
        currentValue += 50;
      } else if (currentValue < 1000) {
        currentValue += 100;
      } else {
        currentValue += 500;
      }
      if (currentValue > max) {
        if (!options.includes(max)) options.push(max);
        break;
      }
    }
    return options;
  };

  const areAllAddOnsSelected = () => {
    return addOns.every((addOn) => selectedAddOns[addOn.name]);
  };

  const handleAddToCart = () => {
    if (!areAllAddOnsSelected()) {
      notify.error(
        "Please select values for all add-ons before adding to cart."
      );
      return;
    }

    const data = {
      quantity,
      price: cartPrice,
      name: product.name,
      information: product.description,
      specifications: transformSpecificationObject(selectedAddOns),
    };
    navigate("/design", { state: { data, product } });
  };

  return (
    <div className="w-full mx-auto border-b border-gray-300 py-9 px-2 sm:px-6 lg:px-8 font-Roobert changeFontSpacing">
      <Breadcrumbs />
      <h1 className="text-3xl mds:text-center font-bold mb-4">{name}</h1>
      <div className="product_display_content">
        <div className="product_display_image">
        <div className="product_display_img">
                <img
                  src={mainImage}
                  alt="Product"
                />
              </div>

              <div className="small_images">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={image === mainImage && "image-active"}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
        </div>

        <div className="product_display_info">

        <div>
              {intro && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Product Overview
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {intro}
                  </p>
                </div>
              )}
              

                <div className="mt-4">
              
                  <div className="order_and_quantity">
                  <div className="quantity_container">
                <h3 className="font-semibold mb-2">Quantity</h3>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
                >
                  {generateQuantityOptions(orderLimit).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "unit" : "units"}
                    </option>
                  ))}
                </select>
              </div>
                      
              <button
          onClick={() => navigate("/checkout", {
            state: {
              orderSummary: {
                items: 1,
                subtotal:   
                  cartPrice
                ,
                tax: 0,
                shipping: shippingOption === "express" ? 2500 : 0,
                total:  cartPrice + (shippingOption === "express" ? 2500 : 0),
              },
            },
          })}
          className="w-1/2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          disabled={!quantity || !areAllAddOnsSelected()}
        >
          Order Now
          <ChevronRight className="w-4 h-4" />
        </button>
              </div>
                </div>
            
            </div>
          </div>

       


      </div>

<div className="specifications_shipping">
<div className="specifications">
{addOns.length > 0 && (
          <div className="">
            <h3 className="text-xl font-semibold mb-6">Specifications</h3>
            <div className="specifications_materials">
              {addOns.map((addOn, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <h4 className="font-bodyFont text-lg mb-4">{addOn.name}</h4>
                  <div className="flex flex-row flex-wrap gap-4">
                    {addOn.values.map((value, valueIndex) => (
                      <div key={valueIndex}>
                        <input
                          type="radio"
                          id={`${addOn.name}-${value.tag}`}
                          name={addOn.name}
                          value={value.tag}
                          checked={
                            selectedAddOns[addOn.name]?.tag === value.tag
                          }
                          onChange={() =>
                            handleAddOnSelect(addOn.name, value.tag)
                          }
                          className="hidden"
                        />
                        <label
                          htmlFor={`${addOn.name}-${value.tag}`}
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <div className="flex flex-col items-center relative">
                            <div
                              className={`relative border-2 rounded-lg p-1 ${
                                selectedAddOns[addOn.name]?.tag === value.tag
                                  ? "border-green-500"
                                  : "border-gray-200"
                              }`}
                            >
                              <img
                                src={value.image}
                                alt={value.tag}
                                className="w-24 h-24 object-cover rounded"
                              />
                              {selectedAddOns[addOn.name]?.tag ===
                                value.tag && (
                                <div className="absolute -top-2 -right-2">
                                  <BsCheckCircleFill className="text-green-500 w-6 h-6 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                            <span className="mt-2 text-sm font-medium">
                              {value.tag}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}  

</div>

<div className="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="font-semibold mb-4">Shipping Options</h3>
                <div className="space-y-3 flex gap-4">
                  <div
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingOption === "standard"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setShippingOption("standard")}
                  >
                    <div className="flex items-center gap-3">
                      <BsTruck className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Standard Shipping</h4>
                        <p className="text-sm text-gray-600">
                          5-7 business days
                        </p>
                        <p className="text-sm font-semibold">Free</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingOption === "express"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setShippingOption("express")}
                  >
                    <div className="flex items-center gap-3">
                      <BsLightningCharge className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Express Shipping</h4>
                        <p className="text-sm text-gray-600">
                          1-2 business days
                        </p>
                        <p className="text-sm font-semibold">₦2,500.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         
         
        


</div>
<div className="summary_card">
<div className="small_image">
<img
                  src={mainImage}
                  alt="Product"
                />
</div>

<div className="summary_name">
<h1 className="text-base md:text-xl font-bold">{name}</h1>
{addOns && addOns.map((material) => (
   <p>
    {
        material.values.map((value) => (
            <span className="material_details">{` ${value.tag}
            `}</span>
        ))
    }
   </p> 
))}
</div>

<div className="summary_quantity text-base mds:text-lg">
    <h3>Quantity</h3>
    <p>{quantity}</p>
</div>


<div className="summary_button_price mds:flex gap-4">
<h1 className=" text-base mds:text-3xl font-bold text-green-600">
                ₦
                {(
                  cartPrice + (shippingOption === "express" ? 2500 : 0)
                ).toLocaleString()}
              </h1>
           
              <button
          onClick={() => navigate("/checkout", {
            state: {
              orderSummary: {
                items: 1,
                subtotal:   
                  cartPrice
                ,
                tax: 0,
                shipping: shippingOption === "express" ? 2500 : 0,
                total:  cartPrice + (shippingOption === "express" ? 2500 : 0),
              },
            },
          })}
          className="bg-green-600 hover:bg-green-700 text-white p-2 mds:p-3 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          disabled={!quantity || !areAllAddOnsSelected()}
        >
          Order Now
          <ChevronRight className="w-4 h-4" />
        </button>
</div>
             


</div>
    </div>
  );

};

export default ProductDisplay;
