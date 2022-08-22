import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./product.scss";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Product = () => {
  const publicationType = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [pType, setPType] = useState("");
  const [newspapername, setNewspapername] = useState("");
  const [publicationName, setPublicationName] = useState("");
  const [specialrate, setSpecialRate] = useState(0);
  const [mondayRate, setMondayRate] = useState(0);
  const [tuesdayRate, setTuesdayRate] = useState(0);
  const [wednesdayRate, setWednesdayRate] = useState(0);
  const [thursdayRate, setThursdayRate] = useState(0);
  const [fridayRate, setFridayRate] = useState(0);
  const [saturdayRate, setSaturdayRate] = useState(0);
  const [sundayRate, setSundayRate] = useState(0);
  const [products, setProducts] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [stock, setStock] = useState(0);
  const [isNewForm, setIsNewForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [productId, setProductId] = useState("");

  const handleUpdateForm = (data) => {
    setProductId(data.id);
    setPType(data.publicationType);
    setNewspapername(data.productName);
    setPublicationName(data.publicationName);
    setSpecialRate(data.specialPrice);
    setMondayRate(data.mondayPrice);
    setTuesdayRate(data.tuesdayPrice);
    setWednesdayRate(data.wednesdayPrice);
    setThursdayRate(data.thursdayPrice);
    setFridayRate(data.fridayPrice);
    setSaturdayRate(data.saturdayPrice);
    setSundayRate(data.sundayPrice);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setStock(data.stock);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "Products", id);
    deleteDoc(docRef).then(() => {
      toast("Successfully Deleted!");
    })
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div className="detailsButton">View</div> */}
            <div
              className="updateButton"
              onClick={() => {
                handleUpdateForm(params.row);
                console.log(params.row);
              }}
            >
              Update
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const productColumns = [
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "publicationName",
      headerName: "Publication Name",
      width: 200,
    },

    {
      field: "publicationType",
      headerName: "Publication Type",
      width: 200,
    },
    {
      field: "sundayPrice",
      headerName: "Sunday Price",
      width: 120,
    },
    {
      field: "mondayPrice",
      headerName: "Monday Price",
      width: 120,
    },
    {
      field: "tuesdayPrice",
      headerName: "Tuesday Price",
      width: 120,
    },
    {
      field: "wednesdayPrice",
      headerName: "Wednesday Price",
      width: 120,
    },
    {
      field: "thursdayPrice",
      headerName: "Thursday Price",
      width: 120,
    },
    {
      field: "fridayPrice",
      headerName: "Friday Price",
      width: 120,
    },
    {
      field: "saturdayPrice",
      headerName: "Saturday Price",
      width: 120,
    },
    {
      field: "specialPrice",
      headerName: "Special Price",
      width: 120,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
    },
  ];

  useEffect(() => {
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
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (publicationName.trim() === "") {
      toast("Please provide publication name.");
      return;
    }
    if (newspapername.trim() === "") {
      toast("Please provide newspapername name.");
      return;
    }
    if (
      pType !== "Daily" &&
      pType !== "Weekly" &&
      pType !== "Monthly" &&
      pType !== "Yearly"
    ) {
      toast("Please provide publication type.");
      return;
    }
    if (
      pType === "Daily" &&
      (!mondayRate ||
        !tuesdayRate ||
        !wednesdayRate ||
        !thursdayRate ||
        !fridayRate ||
        !saturdayRate ||
        !sundayRate)
    ) {
      toast("Please provide all prices.");
      setTimeout(() => {
        setIsNewForm(false);
      }, 3000);
      return;
    }
    if (pType !== "Daily" && !specialrate) {
      toast("Please provide price for newspaper.");
      return;
    }

    db.collection("Products")
      .add({
        publicationName,
        productName: newspapername,
        publicationType: pType,
        mondayPrice: mondayRate,
        tuesdayPrice: tuesdayRate,
        wednesdayPrice: wednesdayRate,
        thursdayPrice: thursdayRate,
        fridayPrice: fridayRate,
        saturdayPrice: saturdayRate,
        sundayPrice: sundayRate,
        specialPrice: specialrate,
        startDate,
        endDate,
        stock,
      })
      .then(() => {
        console.log("data added");
        toast("Added successfully!");
        setIsNewForm(false);
      });

  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (publicationName.trim() === "") {
      toast("Please provide publication name.");
      return;
    }
    if (newspapername.trim() === "") {
      toast("Please provide newspapername name.");
      return;
    }
    if (
      pType !== "Daily" &&
      pType !== "Weekly" &&
      pType !== "Monthly" &&
      pType !== "Yearly"
    ) {
      toast("Please provide publication type.");
      return;
    }
    if (
      pType === "Daily" &&
      (!mondayRate ||
        !tuesdayRate ||
        !wednesdayRate ||
        !thursdayRate ||
        !fridayRate ||
        !saturdayRate ||
        !sundayRate)
    ) {
      toast("Please provide all prices.");
      setTimeout(() => {
        setIsNewForm(false);
      }, 3000);
      return;
    }
    if (pType !== "Daily" && !specialrate) {
      toast("Please provide price for newspaper.");
      return;
    }
    if (pType === "Daily") setSpecialRate(0);
    if (pType !== "Daily") {
      setMondayRate(0);
      setTuesdayRate(0);
      setWednesdayRate(0);
      setThursdayRate(0);
      setFridayRate(0);
      setSaturdayRate(0);
      setSundayRate(0);
    }
    db.collection("Products")
      .doc(productId)
      .update({
        publicationName,
        productName: newspapername,
        publicationType: pType,
        mondayPrice: mondayRate,
        tuesdayPrice: tuesdayRate,
        wednesdayPrice: wednesdayRate,
        thursdayPrice: thursdayRate,
        fridayPrice: fridayRate,
        saturdayPrice: saturdayRate,
        sundayPrice: sundayRate,
        specialPrice: specialrate,
        startDate,
        endDate,
        stock,
      })
      .then(() => {
        toast("Successfully updated!");
        setIsUpdate(false);
      });
  };
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        {!isNewForm && !isUpdate ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Product
              <div className="link" onClick={() => setIsNewForm(true)}>
                Add New
              </div>
            </div>

            <DataGrid
              className="datagrid"
              rows={products}
              columns={productColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>
        ) : isNewForm && !isUpdate ? (
          <div className="bottom" id="new-form">
            <form action="">
              <div className="formInput">
                <label>Newspaper Name</label>
                <input
                  type="text"
                  placeholder="Newspaper Name"
                  onChange={(e) => setNewspapername(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Publication Name</label>
                <input
                  type="text"
                  placeholder="Publication Name"
                  onChange={(e) => setPublicationName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Publication Type</label>
                <select
                  name="Select Publication Type"
                  onChange={(e) => setPType(e.target.value)}
                >
                  <option>---Select Publication Type---</option>
                  {publicationType.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>
              {pType !== "" && pType === "Daily" ? (
                <>
                  <div className="formInput">
                    <label>Sunday Price</label>
                    <input
                      type="number"
                      placeholder="Sunday Price"
                      onChange={(e) => setSundayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Monday Price</label>
                    <input
                      type="number"
                      placeholder="Monday Price"
                      onChange={(e) => setMondayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Tuesday Price</label>
                    <input
                      type="number"
                      placeholder="Tuesday Price"
                      onChange={(e) => setTuesdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Wednesday Price</label>
                    <input
                      type="number"
                      placeholder="Wednesday Price"
                      onChange={(e) => setWednesdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Thursday Price</label>
                    <input
                      type="number"
                      placeholder="Thursday Price"
                      onChange={(e) => setThursdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Friday Price</label>
                    <input
                      type="number"
                      placeholder="Friday Price"
                      onChange={(e) => setFridayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Saturday Price</label>
                    <input
                      type="number"
                      placeholder="Saturday Price"
                      onChange={(e) => setSaturdayRate(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="formInput">
                  <label>Special Price</label>
                  <input
                    type="number"
                    placeholder="Special Price"
                    onChange={(e) => setSpecialRate(e.target.value)}
                  />
                </div>
              )}
              <div className="formInput">
                <label>Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  onChange={(e) =>
                    setStartDate(e.target.value.split("-").reverse().join("-"))
                  }
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>End Date</label>
                <input
                  type="date"
                  placeholder="End Date"
                  onChange={(e) =>
                    setEndDate(e.target.value.split("-").reverse().join("-"))
                  }
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  onChange={(e) => setStock(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <button onClick={(e) => handleSubmit(e)}>ADD</button>
                <button onClick={(e) => setIsNewForm(false)}>CANCEL</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bottom" id="new-form">
            <form action="">
              <div className="formInput">
                <label>Newspaper Name</label>
                <input
                  type="text"
                  placeholder="Newspaper Name"
                  value={newspapername}
                  onChange={(e) => setNewspapername(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Publication Name</label>
                <input
                  type="text"
                  placeholder="Publication Name"
                  value={publicationName}
                  onChange={(e) => setPublicationName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Publication Type</label>
                <select
                  name="Select Publication Type"
                  value={pType}
                  onChange={(e) => setPType(e.target.value)}
                >
                  <option>---Select Publication Type---</option>
                  {publicationType.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>
              {pType !== "" && pType === "Daily" ? (
                <>
                  <div className="formInput">
                    <label>Sunday Price</label>
                    <input
                      type="number"
                      placeholder="Sunday Price"
                      value={sundayRate}
                      onChange={(e) => setSundayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Monday Price</label>
                    <input
                      type="number"
                      placeholder="Monday Price"
                      value={mondayRate}
                      onChange={(e) => setMondayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Tuesday Price</label>
                    <input
                      type="number"
                      placeholder="Tuesday Price"
                      value={tuesdayRate}
                      onChange={(e) => setTuesdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Wednesday Price</label>
                    <input
                      type="number"
                      placeholder="Wednesday Price"
                      value={wednesdayRate}
                      onChange={(e) => setWednesdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Thursday Price</label>
                    <input
                      type="number"
                      placeholder="Thursday Price"
                      value={thursdayRate}
                      onChange={(e) => setThursdayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Friday Price</label>
                    <input
                      type="number"
                      placeholder="Friday Price"
                      value={fridayRate}
                      onChange={(e) => setFridayRate(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Saturday Price</label>
                    <input
                      type="number"
                      placeholder="Saturday Price"
                      value={saturdayRate}
                      onChange={(e) => setSaturdayRate(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="formInput">
                  <label>Special Price</label>
                  <input
                    type="number"
                    placeholder="Special Price"
                    value={specialrate}
                    onChange={(e) => setSpecialRate(e.target.value)}
                  />
                </div>
              )}
              <div className="formInput">
                <label>Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={startDate.split("-").reverse().join("-")}
                  onChange={(e) =>
                    setStartDate(e.target.value.split("-").reverse().join("-"))
                  }
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>End Date</label>
                <input
                  type="date"
                  placeholder="End Date"
                  value={endDate.split("-").reverse().join("-")}
                  onChange={(e) =>
                    setEndDate(e.target.value.split("-").reverse().join("-"))
                  }
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <button onClick={(e) => handleUpdate(e)}>UPDATE</button>
                <button onClick={(e) => setIsUpdate(false)}>CANCEL</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
