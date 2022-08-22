import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { db } from "../../firebaseConfig";
import { doc, addDoc, getDocs, collection, setDoc } from "firebase/firestore";
import "./bill.scss";

const Bill = () => {
  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [vmobile, setVMobile] = useState("");
  const [vAdd, setVAdd] = useState("");
  const [vCity, setVCity] = useState("");
  const [vPin, setVPin] = useState("");
  const [Bal, setBal] = useState(0);

  const [curr, setCurr] = useState(0);

  const [adjust, setAdjust] = useState(0);
  var flg = true;

  const fetch_data = async () => {
    if (flg) {
      var bill_rpt = {};
      var docid = "";
      const querySnapshot = await getDocs(collection(db, "Billing Report"));
      querySnapshot.docs.forEach((element) => {
        var data = element.data();
        if (data.FName == "P N Natu") {
          bill_rpt = data;
          docid = element.id;
        }
      });

      var ct = "";
      const querySnapshot1 = await getDocs(collection(db, "vendors"));
      querySnapshot1.docs.forEach((element) => {
        var data = element.data();
        if (data.vendorName == location.state.vendorName) {
          ct = data.phone;
        }
      });
      setMobile(ct);

      const querySnapshot2 = await getDocs(collection(db, "Agency"));
      querySnapshot2.docs.forEach((element) => {
        var data = element.data();
        if (data.agencyName == "R N Luktuke") {
          setVAdd(data.addressLine1);
          setVCity(data.city);
          setVMobile(data.phone);
          setVPin(data.pincode);
        }
      });

      var count = 0;
      const querySnapshot3 = await getDocs(collection(db, "requests"));
      querySnapshot3.docs.forEach((element) => {
        var data = element.data();
        if (
          data.vendorName == location.state.vendorName &&
          data.date == location.state.date &&
          data.productName == location.state.productName
        ) {
          count = data.count;
        }
      });
      console.log("cnt===" + count);
      if (docid != "") {
        console.log("bill_rpt===" + JSON.stringify(bill_rpt));
        setBal(bill_rpt.Balance);
        setCurr(bill_rpt.currBill);
        setAdjust(bill_rpt.Adjustment);
      }
      var tmp = [];
      var price = 0;
      //console.log(tmp);
      const querySnapshot4 = await getDocs(collection(db, "Products"));
      querySnapshot4.docs.forEach((element) => {
        var data = element.data();
        if (data.productName == location.state.productName) {
          console.log("price==" + data.sundayPrice);
          price = data.sundayPrice;
        }
      });
      //props.setProducts(tmp);

      console.log(price);
      setCurr(price * count);
      if (docid == "" && flg) {
        console.log("//insertBal)");
        console.log("In 1==");
        console.log(Bal);
        console.log(price);

        flg = false;
        //  await updateDoc(washingtonRef, {
        //     Balance:Bal,
        //     currentBill:price*Difference_In_Days,
        //     totalBill:price*Difference_In_Days+Bal
        //   });

        const data = {
          Balance: 0,
          currentBill: price * count,
          totalBill: price * count + Bal,
          Adjustment: 0,
          FName: location.state.vendorName,
          LName: "",
          product: location.state.productName,
        };
        await addDoc(collection(db, "Billing Report"), data).then(() => {
          console.log("Document added");
        });
      } else if (flg) {
        //update
        console.log("In 2==");
        var k = 0;

        console.log(price);
        flg = false;
        const Ref = doc(db, "Billing Report", docid);

        //  await updateDoc(washingtonRef, {
        //     Balance:Bal,
        //     currentBill:price*Difference_In_Days,
        //     totalBill:price*Difference_In_Days+Bal
        //   });

        setDoc(
          Ref,
          {
            Balance: Bal,
            currentBill: price * count,
            totalBill: price * count + Bal,
          },
          {
            merge: true,
          }
        ).then(() => {
          console.log("Document updated");
        });
      }
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);
  var total = 0;
  if (Bal == undefined) total = curr;
  else total = curr + Bal + adjust;

  var current = new Date();
  var Today_dt = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const printOrder = () => {
    const printableElements = document.getElementById("printme").innerHTML;
    const orderHTML =
      "<html><head><title></title></head><body>" +
      printableElements +
      "</body></html>";
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHTML;
    window.print();
    document.body.innerHTML = oldPage;
  };
  
  return (
    <>
    {/* <div className="bill">
       <Sidebar />
      <div className="billContainer">
         <Navbar /> */}
        <div className="link" onClick={printOrder}>
          Print
        </div>
        <div id="printme">
          <div class="main_div">
            <div className="heading">
              <h2>P N NATU</h2>
              <p className="subHd">
                Contact: {vmobile}
                <br></br>
                Address: {vAdd}, {vCity}, {vPin}
              </p>
            </div>
            <p>
              Date: {Today_dt}
              <br></br>
              Product: Pudhari
            </p>
            <p>
              Customer Name: Sukant Jadhav<br></br>
              Mobile No: {mobile}
            </p>
            <br></br>
            <table>
              <tr>
                <th>Discription</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>Bal</td>
                <td>{Bal}</td>
              </tr>
              <tr>
                <td>AdjustMent</td>
                <td>{adjust}</td>
              </tr>
              <tr>
                <td>Current Bill</td>
                <td>{curr}</td>
              </tr>
              <tr>
                <td>Total Bill</td>
                <td>{total}</td>
              </tr>
            </table>
          </div>
        </div>
      {/* </div>
    </div> */}
  </>
  );
};

export default Bill;
