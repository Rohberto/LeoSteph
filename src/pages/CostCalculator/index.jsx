import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import useDataFetching from "../../hooks/useDataFetching";
import { transformCategoriesResponse } from "../../utils/dataSelectors";
import Loader from "../../shared/loader";
import {
  getAllCategories,
  getProductsByCategories,
} from "../../services/categories";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

const CostCalculator = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      product: "",
      quantity: "1",
      addOns: {},
      orderMethod: "",
    },
  });
  const { register, control, handleSubmit, watch, setValue } = form;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [selectedPBC, setSelectedPBC] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addOnsTotal, setAddOnsTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: PBC } = useDataFetching({
    key: ["products by categories", selectedCategory || ""],
    fn: () => getProductsByCategories({ category_id: selectedCategory }),
    enabled: !!selectedCategory,
    select: transformCategoriesResponse,
  });

  const { data: categories, isLoading: isLoadingCategories } = useDataFetching({
    key: ["all categories"],
    fn: getAllCategories,
    select: transformCategoriesResponse,
  });

  const watchQuantity = watch("quantity");
  const watchProduct = watch("product");

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    setQuantity(watchQuantity);
  }, [watchQuantity]);

  useEffect(() => {
    setSelectedPBC(watchProduct);
    // setValue("addOns", "");
  }, [watchProduct, setValue]);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setQuantity("");
    setAddOnsTotal(0);
    setTotalPrice(0);
    setSelectedPBC("");

    // Reset the product selection when category changes
    setValue("product", "");
    setValue("addOns", {});
  };

  const handleProductChange = (event) => {
    const productId = event?.target?.value;
    setSelectedPBC(productId);
  };

  useEffect(() => {
    const selectedProduct = PBC?.find(
      (singlePBC) => singlePBC.id === selectedPBC
    );

    if (selectedProduct?.addOns) {
      const initialAddOns = {};

      selectedProduct.addOns.forEach((addOn, index) => {
        const defaultSelectedValue = addOn.values?.[0];

        if (defaultSelectedValue) {
          // Update the form with the price
          setValue(`addOns.${index}`, defaultSelectedValue.id, {
            shouldDirty: true,
            shouldTouch: true,
          });

          // Update the selectedAddOns state with only id, name, and selectedValue
          initialAddOns[index] = {
            id: addOn.id,
            name: addOn.name,
            selectedValue: defaultSelectedValue,
          };
        }
      });

      setSelectedAddOns(initialAddOns);
    }
  }, [PBC, selectedPBC, setValue]);

  useEffect(() => {
    if (PBC?.length > 0) {
      setValue("product", PBC[0].id);
      setSelectedPBC(PBC[0].id);
    }
  }, [PBC, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      setSelectedCategory(value.category);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const total = Object.values(selectedAddOns)?.reduce(
      (accumulator, currentAddOn) =>
        accumulator + Number(currentAddOn.selectedValue.price),
      0
    );
    setAddOnsTotal(total);
  }, [selectedAddOns]);

  useEffect(() => {
    const newTotalPrice =
      PBC?.find((singlePBC) => singlePBC.id === selectedPBC)?.price * quantity +
      addOnsTotal;
    setTotalPrice(newTotalPrice);
  }, [quantity, addOnsTotal, PBC, selectedPBC]);

  // Function to handle changes in selected add-ons
  const handleAddOnChange = (event, addOn, index) => {
    const selectedValue = addOn.values.find(
      (value) => value.id === event.target.value
    );

    setSelectedAddOns((prevAddOns) => ({
      ...prevAddOns,
      [index]: {
        id: addOn.id,
        name: addOn.name,
        selectedValue,
      },
    }));

    // Set the price to the form field, but store only id, name, and selectedValue in selectedAddOns
    setValue(`addOns.${index}`, selectedValue.id);
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

      // Ensure we don't exceed the max value
      if (currentValue > max) {
        if (!options.includes(max)) {
          options.push(max);
        }
        break;
      }
    }

    return options;
  };

  const onSubmit = (data) => {
    const product = PBC?.find((singlePBC) => singlePBC.id === selectedPBC);
    navigate(`/shop/${product.name}`, {
      state: {
        product: {
          ...product,
          orderQuantity: data.quantity,
          orderMethod: data.orderMethod,
          orderPrice: totalPrice,
        },
        specification: selectedAddOns,
      },
    });
  };

  return (
    <div>
      <div className="max-container bg-white mx-auto min-h-screen py-20 sm:px-6 lg:px-8 font-Roobert changeFontSpacing">
        {isLoadingCategories ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Cost Calculator</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <div className="w-full lg:w-1/2">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="block mt-4 w-full p-5 border border-gray-300 bg-white appearance-none"
                      {...register("category", {
                        onChange: handleCategoryChange,
                      })}
                    >
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4 flex flex-col justify-between md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        What product do you want to order?
                      </label>
                      <select
                        className="block mt-4 w-full p-5 border border-gray-300 bg-white appearance-none"
                        {...register("product", {
                          onChange: handleProductChange,
                        })}
                      >
                        {PBC?.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <select
                        className="block mt-4 w-full p-5 border border-gray-300 bg-white appearance-none"
                        {...register("quantity")}
                      >
                        {PBC &&
                          selectedPBC &&
                          generateQuantityOptions(
                            PBC.find(
                              (singlePBC) => singlePBC.id === selectedPBC
                            )?.orderLimit
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-medium mt-8">Add-ons</h2>
                    <div className="mt-4 flex flex-col gap-4">
                      {PBC?.find(
                        (singlePBC) => singlePBC.id === selectedPBC
                      )?.addOns?.map((addOn, index) => {
                        return (
                          <div
                            key={addOn.name}
                            className="flex items-center gap-4 mb-4 border-l-2 pl-4 h-10"
                          >
                            <label className="w-1/3 font-montserrat text-gray-700">
                              {addOn.name}
                            </label>
                            <div className="flex w-1/3 justify-center items-center flex-1">
                              <select
                                className="block appearance-none w-full xl:w-3/4 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                {...register(`addOns.${index}`)}
                                onChange={(event) =>
                                  handleAddOnChange(event, addOn, index)
                                }
                              >
                                {addOn.values.map((value) => {
                                  return (
                                    <option key={value.id} value={value.id}>
                                      {value.tag}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <span className="flex items-center text-gray-500 ">
                              <FaChevronDown />
                            </span>
                          </div>
                        );
                      })}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          How do you want to order?
                        </label>
                        <select
                          className="block mt-4 w-full p-5 border border-gray-300 bg-white appearance-none"
                          {...register("orderMethod")}
                        >
                          <option value="">Select Order Method</option>
                          <option value="Online">Online</option>
                          <option value="In-Store">In-Store</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Section */}
                <div className="w-full lg:w-1/2 bg-white m-2 p-6 border border-gray-300 flex flex-col gap-6 font-Roobert changeFontSpacing">
                  <div className="flex justify-center items-center mb-4 p-4">
                    <img
                      src={
                        PBC?.find((singlePBC) => singlePBC.id === selectedPBC)
                          ?.images[0]
                      }
                      alt={
                        PBC?.find((singlePBC) => singlePBC.id === selectedPBC)
                          ?.name
                      }
                      className="h-44 object-cover border"
                    />
                  </div>
                  <hr className="border-gray-300 mb-4" />
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    {
                      PBC?.find((singlePBC) => singlePBC.id === selectedPBC)
                        ?.name
                    }
                  </h2>
                  <div className="text-gray-700 flex flex-col items-center">
                    <div className="mb-6 flex justify-between w-full">
                      <strong>{quantity} units</strong>
                      <span>
                        ₦
                        {(
                          PBC?.find((singlePBC) => singlePBC.id === selectedPBC)
                            ?.price * quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="mb-6 flex justify-between w-full">
                      <strong>Add-Ons</strong>
                      <span>₦{addOnsTotal}</span>
                    </div>
                    <div className="flex justify-end items-center w-full mb-6">
                      <div className="flex flex-col items-end">
                        <hr className="border-gray-300 w-32 mb-2" />
                        <span className="text-lg font-semibold">
                          ₦{totalPrice?.toFixed(2)}
                        </span>
                        <hr className="border-gray-300 w-32 mt-2" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <DevTool control={control} />
          </>
        )}
      </div>
    </div>
  );
};

export default CostCalculator;
