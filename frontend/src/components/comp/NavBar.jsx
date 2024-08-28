import { useState } from "react";
import { Link } from "react-router-dom";
import { MdHomeFilled, MdContacts, MdCategory, MdShop2 } from "react-icons/md";

const Navbar = ({ containerStyle }) => {
  const [isActive, setIsActive] = useState("home");

  return (
    <nav className={containerStyle}>
      <Link to="/" onClick={() => setIsActive("home")} className={isActive === "home" ? "active-link" : ""}>
        <div className="flex justify-center gap-x-1"><MdHomeFilled />Home</div>
      </Link>
      <Link to="#shop" onClick={() => setIsActive("shop")} className={isActive === "shop" ? "active-link" : ""}>
        <div className="flex justify-center gap-x-1"><MdCategory />Shop</div>
      </Link>
      <Link to="/" onClick={() => setIsActive("app")} className={isActive === "app" ? "active-link" : ""}>
        <div className="flex justify-center gap-x-1"><MdShop2 />Get App</div>
      </Link>
      <Link to="/" onClick={() => setIsActive("contact")} className={isActive === "contact" ? "active-link" : ""}>
        <div className="flex justify-center gap-x-1"><MdContacts />Contact</div>
      </Link>
    </nav>
  );
}

export default Navbar;
