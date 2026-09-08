import logo from "../../assets/images/Group-56.png";
import "./SideBar.css";
import { Link, NavLink } from "react-router-dom";
import { House, ScanLine, Bell, User } from "lucide-react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-div active" : "nav-div";

export default function SideBar() {
  const generalMenuItems = [
    { title: "Dashboard", path: "/", icon: House },
    { title: "Start Scan", path: "/desp", icon: ScanLine },
  ];

  const otherMenuItems = [
    { title: "Notification", path: "/notification", icon: Bell },
    { title: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="SideBar">
      <div className="ogo">
        <Link to="/">
          <img src={logo} alt="Logo" className="Logo" />
        </Link>
      </div>

      <hr className="s" />

      <div className="general">
        <p className="pip">
          <strong>General</strong>
        </p>

        {generalMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink key={index} to={item.path} className={linkClass}>
              <Icon />
              <p className="nav-text">{item.title}</p>
            </NavLink>
          );
        })}
      </div>

      <hr className="sss" />

      <div className="general">
        <p className="oth">Others</p>

        {otherMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink key={index} to={item.path} className={linkClass}>
              <Icon />
              <p className="nav-text">{item.title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}