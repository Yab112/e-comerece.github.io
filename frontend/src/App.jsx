import { BrowserRouter,useNavigate, Route, Routes } from "react-router-dom";
import Header from "./components/comp/Header"
import { Home, Product, Cart, Myorder, Varify } from "./Pages"
import { Order, LoginPage } from "./components/comp";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./Pages/Context/shopContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PagenotFound from "./Pages/PagenotFound";

export default function App() {
  const { Showlogin, setShowlogin,token } = useContext(ShopContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     toast.error("Session has expired, please log in again.");
  //     navigate("/login");
  //   }
  // }, [token]);

  return (
    <BrowserRouter>
      {(Showlogin || (!token)) && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 z-50 bg-black">
          <LoginPage />
        </div>
      )}
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:prodId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Varify />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PagenotFound />} /> 
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}