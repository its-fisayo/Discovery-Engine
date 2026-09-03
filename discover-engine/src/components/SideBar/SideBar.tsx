import { useState } from "react";
import logo from "../../assets/images/Group-56.png";
import "./SideBar.css";
import { Link, NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  House,
  UserPen,
  Store,
  ChevronRight,
  GitPullRequestCreate,
  SquareCheckBig,
  Tags,
  Bell,
  User,
  Package,
} from "lucide-react";

type DropdownKey =
  | "inventory"
  | "request"
  | "approvals"
  | "issuance"
  | "supply";

type SubMenuItem = {
  title: string;
  path: string;
};

type BaseMenuItem = {
  title: string;
  icon: LucideIcon;
};

type LinkMenuItem = BaseMenuItem & {
  path: string;
  stateKey?: never;
  subMenu?: never;
};

type DropdownMenuItem = BaseMenuItem & {
  stateKey: DropdownKey;
  subMenu: SubMenuItem[];
  path?: never;
};

type MenuItem = LinkMenuItem | DropdownMenuItem;

/* ✅ TYPE GUARD (THIS FIXES YOUR ERROR) */
function isDropdownItem(item: MenuItem): item is DropdownMenuItem {
  return "subMenu" in item;
}

export default function SideBar() {
  // const navigate = useNavigate();
  // const user = getUser();
  // const canAccess = (permission?: PermissionType) => {
  //   if (!permission) return true;

  //   if (!user) return false;

  //   return hasPermission(user.role, permission);
  // };

  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   sessionStorage.removeItem("token");

  //   localStorage.removeItem("user");
  //   sessionStorage.removeItem("user");

  //   navigate("/");
  //   toast.success("You have been logged out");
  // }
  const [dropdowns, setDropdowns] = useState<Record<DropdownKey, boolean>>({
    inventory: false,
    request: false,
    approvals: false,
    issuance: false,
    supply: false,
  });

  const toggleDropdown = (key: DropdownKey) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-div active" : "nav-div";

  // const subLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   isActive ? "submenu-link active" : "submenu-link";

  const generalMenuItems: MenuItem[] = [
    { title: "Dashboard Overview", path: "/dashboard", icon: House },
    {
      title: "User Management",
      path: "/user-management",
      icon: UserPen,
    },

    {
      title: "Inventory",
      icon: Store,
      stateKey: "inventory",
      subMenu: [
        {
          title: "Product Overview",
          path: "/inventory/product-overview",
        },
        {
          title: "Asset Management",
          path: "/inventory/asset-management",
        },
        {
          title: "Asset Report",
          path: "/inventory/asset-report",
        },
        {
          title: "Add New Product",
          path: "/inventory/new-product",
        },
      ],
    },

    {
      title: "Request",
      icon: GitPullRequestCreate,
      stateKey: "request",
      subMenu: [
        {
          title: "Request Page",
          path: "/request/request-page",
        },
        {
          title: "Request History",
          path: "/request/request-history",
        },
        {
          title: "Request Report",
          path: "/request/request-report",
        },
        {
          title: "Pending Requests",
          path: "/request/pending-requests",
        },
      ],
    },

    {
      title: "Approvals",
      icon: SquareCheckBig,
      stateKey: "approvals",
      subMenu: [
        {
          title: "Pending Approvals",
          path: "/approvals/pending-approvals",
        },
        // { title: "Active Logs", path: "/approvals/active-logs" },
      ],
    },

    {
      title: "Issuance",
      icon: Tags,
      stateKey: "issuance",
      subMenu: [
        {
          title: "Team Lead",
          path: "/issuance/team-lead",
        },
        {
          title: "Procurement Officer",
          path: "/issuance/procurement-officer",
        },
      ],
    },

    {
      title: "Supply Management",
      icon: Package,
      stateKey: "supply",
      subMenu: [
        {
          title: "Orders",
          path: "/supply-management/orders",
        },
        {
          title: "New Orders",
          path: "/supply-management/new-orders",
        },
        {
          title: "Stocks",
          path: "/supply-management/stocks",
        },
        {
          title: "Vendor Management",
          path: "/supply-management/vendor-management",
        },
      ],
    },
  ];

  type otherMenuItem =
    | {
        title: string;
        path: string;
        icon: LucideIcon;
        onClick?: never;
      }
    | {
        title: string;
        icon: LucideIcon;
        onClick: () => void;
        path?: never;
      };
  const otherMenuItems: otherMenuItem[] = [
    { title: "Notification", path: "/notification", icon: Bell },
    { title: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="SideBar">
      <div className="ogo">
        <Link to="/dashboard">
          {" "}
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

          /* ✅ SAFE NARROWING */
          if (!isDropdownItem(item)) {
            // if (!canAccess(item.permission)) {
            //   return null;
            // }
            return (
              <NavLink key={index} to={item.path} className={linkClass}>
                <Icon />
                <p className="nav-text">{item.title}</p>
              </NavLink>
            );
          }

          const isOpen = dropdowns[item.stateKey];
          // const visibleSubMenus = item.subMenu.filter((subItem) =>
          //   canAccess(subItem.permission),
          // );
          // if (visibleSubMenus.length === 0) {
          //   return null;
          // }
          return (
            <div className="inventory-container" key={index}>
              <div
                className="nav-div inventory-header"
                onClick={() => toggleDropdown(item.stateKey)}
              >
                <Icon />
                <p className="nav-text">{item.title}</p>
                <ChevronRight
                  className={`dropdown-icon ${isOpen ? "rotate" : ""}`}
                />
              </div>

              <ul className={`inventory-menu ${isOpen ? "open" : ""}`}>
              </ul>
            </div>
          );
        })}
      </div>

      <hr className="sss" />

      <div className="general">
        <p className="oth">Others</p>

        {otherMenuItems.map((item, index) => {
          const Icon = item.icon;

          if (item.path) {
            return (
              <NavLink key={index} to={item.path} className={linkClass}>
                <Icon />
                <p className="nav-text">{item.title}</p>
              </NavLink>
            );
          }

          return (
            <button
              key={index}
              onClick={item.onClick}
              className="nav-div w-full text-left"
            >
              <Icon />
              <p className="nav-text">{item.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
