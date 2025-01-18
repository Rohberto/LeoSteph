import React, {useContext} from "react";
import { DataContext } from "../../context/DataContext";
import { FaUserAlt } from "react-icons/fa";

const UserProfile = () => {
    const {user} = useContext(DataContext);
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between p-4 md:p-8 bg-gray-100 rounded-lg shadow-md font-Roobert changeFontSpacing">
      {/* Profile Section */}
      <div className="w-full  bg-white p-4 rounded-lg shadow-sm mb-6 md:mb-0">
        <div className="flex flex-col items-center md:items-start">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-4">
           <FaUserAlt className="w-12 h-12 text-white"/>
          </div>

          {/* User Information */}
          <h2 className="text-xl font-semibold text-gray-800 text-center md:text-left">
           {user?.firstName}
          </h2>
          <p className="text-gray-600 text-center md:text-left">
           {user?.email}
          </p>
          <p className="text-gray-600 text-center md:text-left">
           {user?.phone}
          </p>
       

          {/* Edit Button */}
          <button className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l-6 6v2h2l6-6m3-3l3.536-3.536a2 2 0 00-2.828-2.828l-3.536 3.536M16 21h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2z"
              />
            </svg>
            Edit
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
