import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widgets from "../../components/widgets/Widgets";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { db } from "../../firebaseConfig";
import Customers_Per_District from "../../components/customerGraph/Customer_Per_District";
import Customers_Per_Product from "../../components/customerGraph/Customer_Per_Product";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    db.collection("customers").onSnapshot((snapshot) => {
      setCustomers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().firstName + " " + doc.data().lastName,
          addressLine1: doc.data().addressLine1,
          addressLine2: doc.data().addressLine2,
          city: doc.data().city,
          district: doc.data().district,
          state: doc.data().state,
          country: doc.data().country,
          pincode: doc.data().pincode,
          phone: doc.data().phone,
          email: doc.data().email,
          deposit: doc.data().deposit,
          areaCode: doc.data().areaCode,
          areaName: doc.data().areaName,
        }))
      );
    });
    db.collection("Products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          productName: doc.data().productName,
          publicationName: doc.data().publicationName,
          publicationType: doc.data().publicationType,
          sundayPrice: doc.data().sundayPrice,
          mondayPrice: doc.data().mondayPrice,
          tuesdayPrice: doc.data().tuesdayPrice,
          wednesdayPrice: doc.data().wednesdayPrice,
          thursdayPrice: doc.data().thursdayPrice,
          fridayPrice: doc.data().fridayPrice,
          saturdayPrice: doc.data().saturdayPrice,
          specialPrice: doc.data().specialPrice,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          stock: doc.data().stock,
        }))
      );
    });
    db.collection("subscription").onSnapshot((snapshot) => {
      setSubs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ProductName: doc.data().ProductName,
        }))
      );
    });
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type="customer" />
          <Widgets type="order" />
          <Widgets type="vendor" />
          <Widgets type="product" />
        </div>
        <div className="charts">
          <div className="donoughtGraph">
            <Customers_Per_Product data={[products, subs]}/>
          </div>
          <div className="barGraph">
            <Customers_Per_District info={customers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
