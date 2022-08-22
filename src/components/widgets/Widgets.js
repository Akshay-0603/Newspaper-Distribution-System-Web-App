import "./widgets.scss";
import CategoryIcon from "@mui/icons-material/Category";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleIcon from "@mui/icons-material/People"
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
const Widgets = ({ type }) => {
  const [customerLength, setCustomerLength] = useState(0);
  const [vendorLength, setVendorLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [productLength, setProductLength] = useState(0);
  
  useEffect(()=> {
    db.collection("customers").onSnapshot((snapshot) => {
      setCustomerLength(
        snapshot.docs.length
      );
    });
    db.collection("vendors").onSnapshot((snapshot) => {
      setVendorLength(
        snapshot.docs.length
      );
    });
    db.collection("requests").onSnapshot((snapshot) => {
      setOrderLength(
        snapshot.docs.length
      );
    });
    db.collection("Products").onSnapshot((snapshot) => {
      setProductLength(
        snapshot.docs.length
      );
    });
  }, [])
  let data;
  switch (type) {
    case "customer":
      data = {
        title: "CUSTOMERS",
        goToLink: "/customers",
        link: "View all customers",
        count: customerLength,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        goToLink: "/orders",
        link: "View all orders",
        count: orderLength,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "vendor":
      data = {
        title: "VENDORS",
        goToLink: "/vendors",
        link: "View all vendors",
        count: vendorLength,
        icon: (
          <PeopleIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        goToLink: "/products",
        link: "See all products",
        count: productLength,
        icon: (
          <CategoryIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.count}
        </span>
        <Link to={data.goToLink} style={{textDecoration: "none"}}>
        <span className="desc">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
