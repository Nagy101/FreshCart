/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContaxt } from "../../Context/CartContext";
import { FavContext } from "../../Context/FavContext";
import toast from "react-hot-toast";

const navLinkClass = ({ isActive }) =>
  `relative pb-1 font-medium transition-colors duration-200 ${
    isActive
      ? "text-main after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-main"
      : "text-gray-600 hover:text-main"
  }`;

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { userToken, setUserToken } = useContext(UserContext);
  let { numberOfCart } = useContext(CartContaxt);
  const { favCount } = useContext(FavContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setShowMenu(false);
    toast.success("Logged out 👋");
    navigate("/login");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        {/* Brand */}
        <Link to={"/"} className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 bg-main rounded-lg">
            <i className="fa-solid fa-cart-shopping text-white text-lg" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Fresh<span className="text-main">Cart</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        {userToken && (
          <div className="hidden lg:flex items-center gap-7">
            <NavLink to={"/"} end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to={"/categories"} className={navLinkClass}>
              Categories
            </NavLink>
            <NavLink to={"/brand"} className={navLinkClass}>
              Brands
            </NavLink>
            <NavLink to={"/products"} className={navLinkClass}>
              Products
            </NavLink>
          </div>
        )}

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-5">
          {userToken ? (
            <>
              <Link
                to={"/favproduct"}
                className="relative text-gray-500 hover:text-red-500 transition-colors text-xl"
                title="Wishlist"
              >
                <i className="fa-regular fa-heart" />
                {!!favCount && (
                  <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                    {favCount}
                  </span>
                )}
              </Link>
              <NavLink
                to={"/cart"}
                className="relative text-gray-500 hover:text-main transition-colors text-xl"
                title="Cart"
              >
                <i className="fa-solid fa-cart-shopping" />
                {!!numberOfCart && (
                  <span className="absolute -top-2 -right-2.5 bg-main text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                    {numberOfCart}
                  </span>
                )}
              </NavLink>
              <NavLink to={"/allorders"} className={navLinkClass}>
                Orders
              </NavLink>
              <button
                onClick={logOut}
                className="bg-main text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to={"/register"} className={navLinkClass}>
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className="bg-main text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                Log In
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-main hover:bg-gray-50 transition"
          aria-label="Toggle menu"
        >
          {showMenu ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {showMenu && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {userToken ? (
              <>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/"}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-house w-5 text-center" /> Home
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/categories"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-list w-5 text-center" /> Categories
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/brand"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-tag w-5 text-center" /> Brands
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/products"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-box-open w-5 text-center" />{" "}
                  Products
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/cart"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-cart-shopping w-5 text-center" />{" "}
                  Cart
                  {!!numberOfCart && (
                    <span className="ml-auto bg-main text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {numberOfCart}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/favproduct"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-regular fa-heart w-5 text-center" /> Wishlist
                  {!!favCount && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {favCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/allorders"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition ${isActive ? "bg-blue-50 text-main" : "text-gray-700 hover:bg-gray-50 hover:text-main"}`
                  }
                >
                  <i className="fa-solid fa-receipt w-5 text-center" /> My
                  Orders
                </NavLink>
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={logOut}
                    className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    <i className="fa-solid fa-right-from-bracket w-5 text-center" />{" "}
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/login"}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-main transition"
                >
                  <i className="fa-solid fa-right-to-bracket w-5 text-center" />{" "}
                  Log In
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={"/register"}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-main transition"
                >
                  <i className="fa-solid fa-user-plus w-5 text-center" />{" "}
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
