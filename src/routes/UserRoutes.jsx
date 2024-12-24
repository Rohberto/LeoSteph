import { Outlet, Route, Routes } from "react-router-dom";

import CostCalculator from "../pages/CostCalculator";
import ProductPage from "../pages/Product";
import CheckoutPage from "../pages/Checkout";
import ProductDisplay from "../pages/Product/ProductRefinedDisplay";
import CustomPrintQuote from "../components/Order/Quote";
import MyAccount from "../pages/UserProfile";
import OrderDetails from "../components/Order/OrderDetails";
import Header from "../components/Landing/Header/Header";
import Footer from "../components/Landing/Footer/Footer";
import Home from "../pages/Landing/Home";
import ContactUs from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import SignIn from "../pages/Auth/sign-in";
import BottomNavigation from "../components/MobileNav/BottomNav";
import ScrollToTop from "../hooks/useScroll";
import ComingSoon from "../pages/Landing/Coming";
import Design from "../pages/Product/Request/design";
import DesignRequestPage from "../pages/Product/Request/customRequest";
import CheckoutResponsePage from "../pages/Checkout/responsePage";
import UserProfile from "../components/Landing/Profile";
import OrdersPage from "../pages/Order/Order";
import FAQ from "../pages/FAQ/FAQ";
import ReturnPolicy from "../pages/Returns/returns";
import DesignRequest from "../pages/Product/Request/customRequest";
import DesignPage from "../pages/Product/Request/design";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
      <BottomNavigation />
    </div>
  );
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<ProductPage />} />

        <Route path="contact" element={<ContactUs />} />
        <Route path="shop/:name" element={<ProductDisplay />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/custom-request" element={<DesignPage />} />
        <Route path="cost-calculator" element={<CostCalculator />} />
        <Route path="quote" element={<CustomPrintQuote />} />
        <Route path="/MyAccount" element={<MyAccount />}></Route>
        <Route path="/MyAccount/:tab" element={<MyAccount />}></Route>
        <Route path="/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/design" element={<Design />}></Route>
        <Route path="/design-request" element={<DesignRequestPage />}></Route>
        <Route path="/order-success" element={<CheckoutResponsePage />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/orders" element={<OrdersPage />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/returns" element={<ReturnPolicy />}></Route>

      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="" element={<ComingSoon />} />
    </Routes>
  );
};

export default UserRoutes;
