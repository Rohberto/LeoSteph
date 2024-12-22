/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import AddOnField from "../../components/Form/AddOnField";
import TextField from "../../components/Form/TextField";
import CategoryField from "../../components/Form/CategoryField";
import ProductImg from "../../components/Product/ProductImg";
import PopularField from "../../components/Product/PopularField";
import MetaData from "../../components/Misc/MetaData";
import post from "../../services/Admin/post";
import notify from "../../utils/notify";
import catchErrors from "../../utils/catchErrors";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const createAddon = () => ({
  name: "",
  values: [{ id: uuidv4(), tag: "", price: "", image: "" }],
  id: uuidv4(),
});

const AddProduct = (props) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      intro: "",
      description: "",
      price: "",
      tags: "",
      orderLimit: {
        min: 0,
        max: 0,
      },
      category: {},
      images: [],
      isPopular: false,
      addOns: [createAddon()],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props?.data) {
      const {
        name,
        intro,
        description,
        price,
        tags,
        orderLimit,
        category,
        images,
        addOns,
        isPopular,
      } = props.data;
      reset({
        name,
        intro,
        description,
        price: Number(price),
        tags: Array.isArray(tags) ? tags.join(", ") : tags,
        category,
        orderLimit,
        images: Array.isArray(images) ? images : [images],
        isPopular,
        addOns: addOns || [createAddon()],
      });
    }
  }, [props?.data, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const formattedData = {
        ...data,
        tags: data.tags,
        category: data.category.id,
        addOns: data.addOns.filter(
          (addon) =>
            addon.name &&
            addon.values.some(
              (value) => value.tag && value.price && value.image
            )
        ),
      };

      if (props?.data) {
        await props?.getEditedData(formattedData);
        notify.success("Product updated successfully!");
      } else {
        const res = await post.createProduct(formattedData);
        notify.success(res.message);
        reset({
          name: "",
          intro: "",
          description: "",
          price: "",
          tags: "",
          category: {},
          orderLimit: {},
          images: [],
          isPopular: false,
          addOns: [createAddon()],
        });
      }
    } catch (e) {
      console.error(e);
      const msg = catchErrors(e);
      notify.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOns = (action, addOn) => {
    const currentAddOns = getValues("addOns");
    if (action === "add") {
      setValue("addOns", [...currentAddOns, createAddon()]);
    } else if (action === "remove") {
      const newAddOns = currentAddOns.filter((field) => field.id !== addOn.id);
      setValue("addOns", newAddOns.length ? newAddOns : [createAddon()]);
    }
  };

  const handleAddOnValues = (selectedAddOn, action, valueId) => {
    const currentAddOns = getValues("addOns");
    const updatedAddOns = currentAddOns.map((aOn) => {
      if (aOn.id === selectedAddOn.id) {
        if (action === "add") {
          return {
            ...aOn,
            values: [
              ...aOn.values,
              { id: uuidv4(), tag: "", price: "", image: "" },
            ],
          };
        } else if (action === "remove") {
          const newValues = aOn.values.filter((value) => value.id !== valueId);
          return {
            ...aOn,
            values: newValues.length
              ? newValues
              : [{ id: uuidv4(), tag: "", price: "", image: "" }],
          };
        }
      }
      return aOn;
    });
    setValue("addOns", updatedAddOns);
  };

  toast.error(errors); // Add this line for debugging

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen mb-10 p-4 flex flex-col items-center"
    >
      <MetaData
        title="Add Product"
        description="Add new product to database using the form"
        type="page"
      />
      <h1 className="text-3xl font-bold mb-6">
        {props?.data ? "Edit Product" : "Add New Product"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Product name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Product Name"
              placeholder="e.g., Business Card"
              error={error?.message}
            />
          )}
        />

        <Controller
          name="intro"
          control={control}
          rules={{
            required: "Summary is required",
            minLength: { value: 20, message: "Minimum 20 characters" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Summary"
              placeholder="This is a summary or an intro of this product"
              error={error?.message}
              type="textarea"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{
            required: "Description is required",
            minLength: { value: 20, message: "Minimum 20 characters" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Product Description"
              type="textarea"
              placeholder="This is the full description of this product"
              error={error?.message}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              placeholder="20000"
              error={error?.message}
            />
          )}
        />
        <div className="space-y-4">
          <label className="block  text-xl font-medium text-gray-700">
            Order Limits
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="orderLimit.min"
              control={control}
              rules={{
                required: "Minimum order limit is required",
                min: { value: 0, message: "Minimum limit cannot be negative" },
                validate: (value) => {
                  const max = getValues("orderLimit.max");
                  if (max && value > max) {
                    return "Minimum limit cannot be greater than maximum limit";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <TextField
                    {...field}
                    type="number"
                    label="Minimum Order"
                    placeholder="0"
                    error={error?.message}
                  />
                </div>
              )}
            />

            <Controller
              name="orderLimit.max"
              control={control}
              rules={{
                required: "Maximum order limit is required",
                min: { value: 0, message: "Maximum limit cannot be negative" },
                validate: (value) => {
                  const min = getValues("orderLimit.min");
                  if (min && value < min) {
                    return "Maximum limit cannot be less than minimum limit";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <TextField
                    {...field}
                    type="number"
                    label="Maximum Order"
                    placeholder="0"
                    error={error?.message}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <Controller
          name="tags"
          control={control}
          rules={{ required: "Tags are required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Tags"
              placeholder="new, old, fresh..."
              helperText="Separate tags with comma (,)"
              error={error?.message}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <CategoryField
              onChange={field.onChange}
              value={field.value}
              name={field.name}
            />
          )}
        />

        <div className="space-y-4 border border-gray-300 rounded-md p-4">
          <h2 className="text-xl font-semibold">AddOns</h2>
          <Controller
            name="addOns"
            control={control}
            render={({ field }) => (
              <>
                {field.value.map((addOn, index) => (
                  <AddOnField
                    key={addOn.id}
                    initialValue={addOn}
                    getAddOn={(updatedAddOn) => {
                      const newAddOns = [...field.value];
                      newAddOns[index] = updatedAddOn;
                      field.onChange(newAddOns);
                    }}
                    onRemove={handleAddOns}
                    valuesHandler={handleAddOnValues}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newAddOns = [...field.value, createAddon()];
                    field.onChange(newAddOns);
                  }}
                  className="inline-flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <AiOutlinePlus className="h-5 w-5 mr-2" />
                  Add New Addon
                </button>
              </>
            )}
          />
        </div>
        <Controller
          name="images"
          control={control}
          rules={{ required: "At least one product image is required" }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <ProductImg
                getImages={field.onChange}
                initial={field.value}
                reset={reset}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="isPopular"
          control={control}
          render={({ field }) => (
            <PopularField
              getValue={field.onChange}
              initialValue={field.value}
              reset={reset}
            />
          )}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white font-bold rounded-md transition-colors ${
            isSubmitting ? "bg-gray-400" : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : props?.data
            ? "Save Edited Product"
            : "Add New Product"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
