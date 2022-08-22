import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getCurrenuser } from "./firebaseConfig";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { setUserState } from "./redux/action";
import Home from "./pages/home/Home"
import Vendor from "./pages/vendor/Vendor"
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Product from "./pages/product/Product";
import { productInputs, userInputs } from "./formSource";
import './style/dark.scss'
import { DarkModeContext } from "./context/darkModeContext";
import Customer from "./pages/customers/Customer";
import Notification from "./pages/notifications/Notification";
import Order from "./pages/orders/Order";
import Agency from "./pages/agency/Agency";
import Bill from "./pages/bills/Bill";
const RoutingSystem = () => {
  return (
    <>
      <Routes>
        <Route path="/agency-login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/vendors" element={<Vendor/>} />
        <Route path="/customers" element={<Customer/>} />
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/orders" element={<Order/>} />
        <Route path="/users/:userId" element={<Single/>} />
        <Route path="/users/new" element={<New inputs = {userInputs} title="Add New User"/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:productId" element={<Single/>} />
        <Route path="/products/new" element={<New inputs = {productInputs} title="Add New Product"/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agency-signup" element={<Agency />} />
        <Route path="/bill" element={<Bill/>} />
      </Routes>
    </>
  );
};

function App() {
  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrenuser().then((user) => {
      if (user) {
        console.log(user);
        dispatch(setUserState(user.email));
        navigate('/');
      } else {
        navigate("/agency-login");
      }
      setBusy(false);
    });
  }, []);

  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          {busy ? <p>Loading...</p> : <RoutingSystem />}
        </div>
      </div>
    </div>
  );
}
export default App;
