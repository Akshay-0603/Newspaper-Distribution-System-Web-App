import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { logoutUser } from '../../firebaseConfig';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  async function logout() {
    await logoutUser()
    navigate('/agency-login');
}
    const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration: "none"}}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration: "none"}}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/vendors" style={{textDecoration: "none"}}>
          <li>
            <PeopleIcon className="icon" />
            <span>Vendors</span>
          </li>
          </Link>
          <Link to="/customers" style={{textDecoration: "none"}}>
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Customers</span>
          </li>
          </Link>
          <Link to="/products" style={{textDecoration: "none"}}>
          <li>
            <CategoryIcon className="icon" />
            <span>Products</span>
          </li>
          </Link>
          <Link to="/orders" style={{textDecoration: "none"}}>
          <li>
            <BorderColorOutlinedIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
          <li>
            <DeliveryDiningIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <QueryStatsIcon className="icon" />
            <span>Stats</span>
          </li>
          <Link to="/notifications" style={{textDecoration: "none"}}>
          <li>
            <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>
          </Link>
          <p className="title">SERVICE</p>
          <li>
            <HealthAndSafetyOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <TextSnippetOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AssignmentIndIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={logout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;
