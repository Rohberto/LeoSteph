"use client";

import { useState } from "react";

const Customers = () => {
  const [superUsers, setSuperUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      permissions: ["products", "categories", "users", "orders"],
    },
    {
      id: 2,
      name: "Manager User",
      email: "manager@example.com",
      permissions: ["products", "categories", "orders"],
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSuperUser, setNewSuperUser] = useState({
    name: "",
    email: "",
    permissions: [],
  });

  const handleAddSuperUser = () => {
    setSuperUsers([
      ...superUsers,
      { id: superUsers.length + 1, ...newSuperUser },
    ]);
    setNewSuperUser({ name: "", email: "", permissions: [] });
    setIsAddDialogOpen(false);
  };

  const handleDeleteSuperUser = (id) => {
    setSuperUsers(superUsers.filter((user) => user.id !== id));
  };

  const handlePermissionChange = (permission) => {
    setNewSuperUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Super User Management</h2>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Super User
        </button>
      </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl">
            <h3 className="text-xl font-semibold mb-2">Add New Super User</h3>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <label className="text-right">Name</label>
                <input
                  type="text"
                  value={newSuperUser.name}
                  onChange={(e) =>
                    setNewSuperUser({ ...newSuperUser, name: e.target.value })
                  }
                  className="border rounded p-2 col-span-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-right">Email</label>
                <input
                  type="email"
                  value={newSuperUser.email}
                  onChange={(e) =>
                    setNewSuperUser({ ...newSuperUser, email: e.target.value })
                  }
                  className="border rounded p-2 col-span-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-right">Permissions</label>
                <div className="col-span-1">
                  {["products", "categories", "users", "orders"].map(
                    (permission) => (
                      <div key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          id={permission}
                          checked={newSuperUser.permissions.includes(
                            permission
                          )}
                          onChange={() => handlePermissionChange(permission)}
                          className="mr-2"
                        />
                        <label htmlFor={permission} className="text-sm">
                          {permission}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddSuperUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Super User
              </button>
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Permissions</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {superUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.permissions.join(", ")}
              </td>
              <td className="border px-4 py-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDeleteSuperUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
