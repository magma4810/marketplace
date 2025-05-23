import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "../pages/SignInPage/Signin";
import { Signup } from "../pages/SignUpPage/Signup";
import { ProtectedRoute } from "../features/auth/ui/ProtectedRoute";
import { MyOrders } from "../pages/MyOrdersPage/MyOrders";
import { Cart } from "../pages/CartPage/Cart";
import { ProductDetail } from "../pages/ProductDetailPage/ProductDetail";
import { Products } from "@/pages/ProductsPage/Products";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Products />} />
        <Route
          path="/products/:id"
          element={
            <>
              <Products />
              <ProductDetail />
            </>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
