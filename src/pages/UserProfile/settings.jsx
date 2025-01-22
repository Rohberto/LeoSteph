import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword } from "../../services/user";
import { DevTool } from "@hookform/devtools";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const AccountSettings = () => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    getValues,
    control,
    reset,
    formState: { errors },
  } = form;

  const { mutate: updatePasswordMutation, isPending: isLoading } = useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password updated succesfully");
      reset();
    },
    onError: (data) => {
      console.log(data);
      toast.error(data.message || "SOmething went wrong");
    },
  });

  const handleSubmit = async (formValues, e) => {
    e.preventDefault();

    console.log(formValues, "formValues");
    const data = {
      oldPassword: formValues.currentPassword,
      newPassword: formValues.newPassword,
    };
    console.log(data);

    try {
      updatePasswordMutation({ data });
    } catch (error) {
      toast.error(error.message || "Something went wrong updating password");
    }
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
      <DevTool control={control} />
      <div className="max-w-4xl mx-auto p-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="currentPassword"
                type={showPasswords.currentPassword ? "text" : "password"}
                {...register("currentPassword", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("currentPassword")}
              >
                {showPasswords.currentPassword ? (
                  <FaEye color="#646465" />
                ) : (
                  <FaEyeSlash color="#646465" />
                )}
              </button>
            </div>
            <p className="text-red-500 text-xs">{errors?.password?.message}</p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="newPassword"
                type={showPasswords.newPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                {showPasswords.newPassword ? (
                  <FaEye color="#646465" />
                ) : (
                  <FaEyeSlash color="#646465" />
                )}
              </button>
            </div>
            <p className="text-red-500 text-xs">
              {errors?.newPassword?.message}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="confirmPassword"
                type={showPasswords.confirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: (value) => {
                    const { newPassword } = getValues();
                    return value === newPassword || "Passwords do not match";
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPasswords.confirmPassword ? (
                  <FaEye color="#646465" />
                ) : (
                  <FaEyeSlash color="#646465" />
                )}
              </button>
            </div>
            <p className="text-red-500 text-xs">
              {errors?.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#90A955] hover:bg-[#31572C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountSettings;