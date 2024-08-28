import { Link, redirect } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Navbar from "./NavBar";
import { useState, useEffect, useRef, useContext } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "../../Pages/Context/shopContext";
import { FaCircleUser } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef(null);
  const { getObjectLength, Showlogin, setShowlogin, logout, token, setToken } =
    useContext(ShopContext);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    if (menuOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpened]);

  // Effect to synchronize state with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== token) {
      setToken(storedToken); // Update state when localStorage changes
    }
  }, [token, setToken]);
 
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md h-20">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center lg:gap-x-40 gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logoimage" className="h-10 rounded-full border-amber-400 border-4 " />
              <span className="text-amber-400 font-bold text-2xl">Yab Store</span>
            </Link>
            {/* Navbar for desktop */}
            <div className="hidden md:flex">
              <Navbar containerStyle="flex gap-x-5 xl:gap-x-10" />
            </div>
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-6">
            {!token ? (
              <button
                className="btn-outline rounded-full"
                onClick={() => setShowlogin(!Showlogin)}
              >
                Login
              </button>
            ) : (
              <>
                <Link to={"/cart"} className="relative flex items-center">
                  <FaShoppingCart className="text-2xl" />
                  <span
                    className={
                      getObjectLength() > 0
                        ? "absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-secondary text-white text-xs rounded-full -mt-1 -mr-1"
                        : ""
                    }
                  >
                    {getObjectLength() > 0 ? getObjectLength() : ""}
                  </span>
                </Link>
              <div className="group relative flex gap-10">
                <FaCircleUser className="text-2xl cursor-pointer" />
                <ul className="hidden group-hover:block absolute right-3 mt-7 w-48 bg-white shadow-lg rounded-md">
                  <li className="p-2 hover:bg-gray-100">
                    <Link to="/myorder" className="flex items-center">
                      <FiPackage className="text-2xl" />
                      <span className="ml-2">Orders</span>
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left"
                    >
                      <span className="ml-2">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
              </>
            )}
            {/* Hamburger menu for small and medium devices */}
            <div className="md:hidden">
              {menuOpened ? (
                <MdClose
                  onClick={toggleMenu}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <MdMenu
                  onClick={toggleMenu}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        {/* Navbar for mobile */}
        {menuOpened && (
          <div
            ref={menuRef}
            className="fixed inset-0 bg-white z-30 flex flex-col items-end gap-y-4 p-4 rounded-lg shadow-md w-[400px] h-[400px] right-0 top-20 left-20"
          >
            <Navbar containerStyle="flex flex-col items-start gap-y-4 w-full" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
