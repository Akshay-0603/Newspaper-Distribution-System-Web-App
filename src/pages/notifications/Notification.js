import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./notification.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Notification = () => {
  const agencyEmail = useSelector((state) => state.user.username);
  const [notifications, setNotifications] = useState([]);
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState();
  const [isNewForm, setIsNewForm] = useState(false);
  const [currentdate, setCurrentdate] = useState(new Date(Date.now()));
  const [role, setRole] = useState("");

  const formatDate = (d) => {
    var temp = d.split("-");
    var res = temp[1] + "-" + temp[0] + "-" + temp[2];
    return res;
  };
  useEffect(() => {
    const handleLoad = async () => {
      const notRef = db.collection("notifications");
      const snapshot = await notRef
        .where("agencyEmail", "==", agencyEmail)
        .get();

      if (!snapshot.empty) {
        console.log(snapshot, "snap");
        setNotifications(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            subject: doc.data().subject,
            description: doc.data().description,
            startDate: formatDate(doc.data().startDate),
            endDate: formatDate(doc.data().endDate),
            status: doc.data().status,
            role: doc.data().role
          }))
        );
      }
    };
    handleLoad();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(role === "---Select Role---")
    {
      toast("Please provide role for notification.");
      return;
    }
    if(role.trim() === "")
    {
      toast("Please provide role for notification.");
      return;
    }
    if (subject.trim() === "") {
      toast("Please provide title for notification.");
      return;
    }
    if (description.trim() === "") {
      toast("Please provide description for notification.");
      return;
    }
    if (startDate.trim() === "") {
      toast("Please provide start date for notification.");
      return;
    }
    if (endDate.trim() === "") {
      toast("Please provide end date for notification.");
      return;
    }

    db.collection("notifications")
      .add({
        subject,
        description,
        startDate,
        endDate,
        status: true,
        role
      })
      .then(() => {
        toast("Successfully Added!");
        setIsNewForm(false);
      });
  };

  return (
    <div className="notification">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
        {!isNewForm ? (
          <div className="dataTitle">
            Add New Notification
            <div className="link" onClick={() => setIsNewForm(true)}>
              Add New
            </div>
          </div>
        ) : (
          <></>
        )}

        {notifications.length && !isNewForm ? (
          notifications.map((n) => (
            <div className="widget" key={n.id}>
              <div className="title">{n.subject}</div>
              <div className="description">{n.description}</div>
              {new Date(n.endDate).getTime() < currentdate.getTime() ? (
                <div className="expired">Expired</div>
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
        {isNewForm ? (
          <>
            <div className="bottom" id="new-form">
              <form action="">
                <div className="formInput">
                  <label>Notification Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setSubject(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Describe in maximum 30 words."
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                  />
                </div>
                <div className="formInput">
                  <label>Start Date</label>
                  <input
                    type="date"
                    placeholder="Start Date"
                    onChange={(e) =>
                      setStartDate(
                        e.target.value.split("-").reverse().join("-")
                      )
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
                  <label>For</label>
                  <select
                  name="Select Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>---Select Role---</option>
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                </select>
                </div>
                <div className="formInput">
                  <button onClick={(e) => handleSubmit(e)}>ADD</button>
                  <button onClick={(e) => setIsNewForm(false)}>CANCEL</button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Notification;
