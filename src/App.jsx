import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Toast from "./components/Misc/Toast";
import ScrollToTop from "./utils/scrolltoTop";
import Preloader from "./components/Preloader/Preloader";

function App() {
  return (
    <div className="font-custom">
      <Preloader/>
      <Toast />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
