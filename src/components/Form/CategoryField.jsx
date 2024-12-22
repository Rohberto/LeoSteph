/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import useField from "../../hooks/useField";
import TextField from "./TextField";
import PropTypes from "prop-types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import get from "../../services/Admin/get";
import post from "../../services/Admin/post";
import notify from "./../../utils/notify";
import catchErrors from "./../../utils/catchErrors";
import { LuLoader2 } from "react-icons/lu";

const CategoryField = ({
  onChange,
  value,
  name = "category",
  label = "Choose a category",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => get.getAllCategories(),
    select: (data) => data?.data || [],
  });
  const queryClient = useQueryClient();

  const { mutate: createCategory } = useMutation({
    mutationFn: (data) => post.createCategory(data),
    onSuccess: (res) => {
      notify.success(res.message);
      queryClient.invalidateQueries(["categories"]);
      setIsNew(false);
      reset();
      setIsLoading(false);

      refetch();
    },
    onError: (error) => {
      const msg = catchErrors(error);
      notify.error(msg);
      setIsLoading(false);
    },
  });

  const { reset, ...nameField } = useField({
    type: "text",
    name: "category_name",
    label: "Category Name",
    min: 3,
    max: 30,
    isRequired: true,
  });

  const handleSelection = (e) => {
    const selectedValue = e.target.value;
    if (!selectedValue) return onChange(null);
    onChange(JSON.parse(selectedValue));
  };

  const handleCreateCategory = async () => {
    if (!nameField.value) return;
    setIsLoading(true);
    createCategory({ name: nameField.value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-lg font-medium" htmlFor={name}>
          {label}
        </label>
        <select
          id={name}
          value={value ? JSON.stringify(value) : ""}
          onChange={handleSelection}
          className="w-full rounded-md border border-gray-300 p-2 text-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option value="">Select category</option>
          {data?.map((category) => (
            <option key={category.id} value={JSON.stringify(category)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Can't find a category?</span>
        <button
          type="button"
          onClick={() => setIsNew(true)}
          className="text-cyan-600 hover:text-cyan-700 font-medium underline"
        >
          Create new
        </button>
      </div>

      {isNew && (
        <div className="space-y-4 mt-4">
          <TextField {...nameField} placeholder="e.g Business cards" />

          <button
            type="button"
            disabled={!nameField.value || isLoading}
            onClick={handleCreateCategory}
            className={`
              w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md
              font-medium text-white transition-colors
              ${
                !nameField.value
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }
            `}
          >
            {isLoading && <LuLoader2 className="animate-spin" size={20} />}
            Add Category
          </button>
        </div>
      )}
    </div>
  );
};

const props = {
  getCategory: PropTypes.func,
};

CategoryField.propTypes = props;

export default CategoryField;
