/* eslint-disable react/prop-types */
const AdminName = ({ data }) => {
  return <div>Welcome, {data?.name || "Admin"}!</div>;
};

export default AdminName;
