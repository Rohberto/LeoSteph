import { Routes, Route } from "react-router-dom";
import AdminHome from "../components/Admin";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import WithAdmin from "../hocs/WithAdmin";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={WithAdmin(AdminHome)}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={WithAdmin(Dashboard)}></Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
