import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import get from "../../../../services/Admin/get";
import post from "../../../../services/Admin/post";
import del from "../../../../services/Admin/del";
import patch from "../../../../services/Admin/patch";
import notify from "../../../../utils/notify";
import catchErrors from "../../../../utils/catchErrors";
import { Icon } from "@iconify/react";
import ConfirmationDialog from "../../../../shared/dialog";

const CategoryView = () => {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch categories
  const { data = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: get.getAllCategories,
  });

  // Create category
  const createMutation = useMutation({
    mutationFn: post.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notify.success("Category created successfully");
      setCategoryName("");
    },
    onError: (error) => {
      const msg = catchErrors(error);
      notify.error(msg);
    },
  });

  // Update category
  const updateMutation = useMutation({
    mutationFn: ({ id, name }) => patch.updateCategory(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notify.success("Category updated successfully");
      setCategoryName("");
      setIsEditing(false);
      setSelectedCategory(null);
    },
    onError: (error) => {
      const msg = catchErrors(error);
      notify.error(msg);
    },
  });

  // Delete category
  const deleteMutation = useMutation({
    mutationFn: del.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      notify.success("Category deleted successfully");
    },
    onError: (error) => {
      const msg = catchErrors(error);
      notify.error(msg);
    },
  });

  const handleCreateOrUpdate = () => {
    if (isEditing && selectedCategory) {
      updateMutation.mutate({ id: selectedCategory.id, name: categoryName });
    } else {
      createMutation.mutate({ name: categoryName });
    }
    refetch();
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category); // Use setSelectedCategory instead of selectedCategory
    setIsDialogOpen(true); // Open the dialog
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory);
      setIsDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedCategory(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4">Category Management</h1>

      {/* Category List */}
      <div className="mb-4 space-y-2">
        {data?.data?.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center p-2 bg-white rounded shadow"
          >
            <div>{category.name}</div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Form */}
      <div className="mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleCreateOrUpdate}
          disabled={
            !categoryName ||
            createMutation.isPending ||
            updateMutation.isPending
          }
          className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded ${
            categoryName &&
            !createMutation.isPending &&
            !updateMutation.isPending
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {isEditing ? "Update Category" : "Create Category"}
          {(createMutation.isPending || updateMutation.isPending) && (
            <Icon
              icon="eos-icons:loading"
              className="animate-spin"
              width={24}
            />
          )}
        </button>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Delete Category"
        message={`Are you sure you want to delete the category?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
export default CategoryView;
