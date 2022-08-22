import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./order.scss";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure();

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const approveRequest = async (data) => {
    const snap = await getDoc(doc(db, "Products", data.productId));

    if (snap.exists()) {
      console.log(snap.data());
      if (snap.data().stock - data.count <= 0) {
        toast("Can't be placed order...insufficient stock!");
        return;
      } else {
        db.collection("Products")
          .doc(data.productId)
          .update({
            stock: snap.data().stock - data.count,
          })
          .then(() => {
            db.collection("requests")
              .doc(data.id)
              .update({
                status: "Approved",
              })
              .then(() => {
                toast("Successfully placed order!");
              });
          });
      }
    } else {
      console.log("No such document");
    }
    // const newspaper = db.collection('products').doc(data.productId).get().then(() => {
    //     console.log(newspaper, "hi");
    // });
  };
  const goToBill = (data) => {
    console.log(data);
    navigate('/bill', { state: { vendorName: data.vendorName, productName: data.productName,  date: data.date } })
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className={`status ${params.row.status}`}>
              {params.row.status}
            </div>
            {params.row.status === "Pending" ? (
              <div
                className="approveButton"
                onClick={() => {
                  approveRequest(params.row);
                  console.log(params.row);
                  console.log(orders);
                }}
              >
                Approve
              </div>
            ) : (
              <></>
            )}
            <div className="billButton" onClick={()=>{
              goToBill(params.row);
            }}>Generate Bill</div>
          </div>
        );
      },
    },
  ];
  const orderColumns = [
    {
      field: "productId",
      headerName: "Product ID",
      width: 200,
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "vendorId",
      headerName: "Vendor ID",
      width: 200,
    },

    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "count",
      headerName: "Demand",
      width: 120,
    },
  ];

  useEffect(() => {
    db.collection("requests").onSnapshot((snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          vendorId: doc.data().vendorId,
          vendorName: doc.data().vendorName,
          status: doc.data().status,
          count: doc.data().count,
          date: doc.data().date,
          productName: doc.data().productName,
          productId: doc.data().productId,
        }))
      );
    });
  }, []);
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="datatable">
          <DataGrid
            className="datagrid"
            rows={orders}
            columns={orderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
