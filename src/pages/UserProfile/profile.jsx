import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/user";
import { toast } from "react-toastify";

const MyProfile = ({ data }) => {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setUserData({
        name: `${data.lastName} ${data.firstName}`,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateUserData(data),
    onSuccess: (e) => {
      console.log(e);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast.success("User details updated successfully");
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong");
    },
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {};
    formData.name = userData.name;
    formData.phone = userData.phone;

    mutate({ data: formData });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8 sm:mt-12">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="john@example.com"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-[#90A955] hover:bg-[#31572C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;

MyProfile.propTypes = {
  data: PropTypes.object,
};