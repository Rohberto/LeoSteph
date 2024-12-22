import { useState } from "react";

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      activity: "Logged in",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      activity: "Requested a quote",
    },
  ]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="bg-white shadow rounded overflow-x-auto">
        {" "}
        {/* Added overflow-x-auto */}
        <table className="w-full min-w-[400px]">
          {" "}
          {/* Added min-w */}
          <thead>
            <tr className="bg-gray-200 text-left">
              {" "}
              {/* Added text-left */}
              <th className="px-4 py-2 w-16">ID</th> {/* Added width for ID */}
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2 text-center">{user.id}</td>{" "}
                {/* Centered ID */}
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
