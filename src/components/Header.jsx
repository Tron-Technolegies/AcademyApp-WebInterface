import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { UserContext } from "../UserContext";
import { useLogout } from "../../hooks/auth/useAuth";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPending, mutateAsync } = useLogout();
  return (
    <header className="relative md:px-25 px-5 py-3 h-20 bg-[#F4E1FD70] rounded-b-[30px] md:rounded-b-[50px] flex justify-between items-center">
      <img
        src="/logo2.png"
        alt="Logo"
        className="object-cover h-10 md:h-auto"
      />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4 items-center font-kumbh text-[#4F4F4F] font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-[#C441F4] font-semibold" : ""
          }
        >
          Dashboard
        </NavLink>
        {user?.role === "teacher" && (
          <>
            <NavLink
              to={"/students"}
              className={({ isActive }) =>
                isActive ? "text-[#C441F4] font-semibold" : ""
              }
            >
              Students
            </NavLink>
            <NavLink
              to={"/class"}
              className={({ isActive }) =>
                isActive ? "text-[#C441F4] font-semibold" : ""
              }
            >
              Class
            </NavLink>
            <NavLink
              to={"/community"}
              className={({ isActive }) =>
                isActive ? "text-[#C441F4] font-semibold" : ""
              }
            >
              Community
            </NavLink>
          </>
        )}
      </nav>

      <div className="flex gap-3 md:gap-5 items-center">
        <Link
          to={"/notifications"}
          className="text-[#4F4F4F] hover:text-[#C441F4]"
        >
          <GoBell size={22} />
        </Link>

        {/* Desktop Profile Dropdown */}
        <div className="hidden md:block relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-[#D8B4FE] bg-white/80 px-3 py-2 font-plus shadow-sm transition hover:shadow-md"
          >
            {user?.profilePicUrl ? (
              <img
                src={user?.profilePicUrl}
                alt="profile-fic"
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <p className="w-9 h-9 bg-[#904CC8] rounded-full flex text-white items-center justify-center">
                {user?.email?.slice(0, 1)?.toUpperCase()}
              </p>
            )}

            <div className="flex flex-col gap-1 text-left">
              <p className="font-semibold text-[#4F4F4F]">
                Hello,{" "}
                {user?.firstName || user?.instructorDetails?.instructorName}
              </p>
              <p className="text-xs text-[#6B7280]">{user?.email}</p>
            </div>

            <span className="ml-1 text-lg text-[#904CC8]">▾</span>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
              <button
                type="button"
                disabled={isPending}
                onClick={async () => {
                  await mutateAsync();
                  setUser(null);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {isPending ? "Logging Out" : "Logout"}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-[#4F4F4F] bg-white/80 border border-[#D8B4FE] shadow-sm hover:shadow-md"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-22 left-5 right-5 bg-white/95 backdrop-blur-md border border-[#F4E1FD] shadow-xl rounded-3xl p-5 z-50 flex flex-col gap-4 md:hidden">
          <nav className="flex flex-col gap-3 font-kumbh text-[#4F4F4F] font-medium">
            <NavLink
              to={"/"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg ${isActive ? "text-[#C441F4] bg-[#F4E1FD40] font-semibold" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to={"/students"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg ${isActive ? "text-[#C441F4] bg-[#F4E1FD40] font-semibold" : ""}`
              }
            >
              Students
            </NavLink>
            <NavLink
              to={"/class"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg ${isActive ? "text-[#C441F4] bg-[#F4E1FD40] font-semibold" : ""}`
              }
            >
              Class
            </NavLink>
            <NavLink
              to={"/community"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg ${isActive ? "text-[#C441F4] bg-[#F4E1FD40] font-semibold" : ""}`
              }
            >
              Community
            </NavLink>
          </nav>
          <hr className="border-[#F4E1FD]" />
          <div className="flex items-center gap-3 px-3 py-2">
            {user?.profilePicUrl ? (
              <img
                src={user.profilePicUrl}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
            ) : (
              <div className="w-10 h-10 bg-[#904CC8] rounded-full flex text-white items-center justify-center font-bold">
                {user?.email?.slice(0, 1)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="flex flex-col">
              <p className="font-semibold text-sm text-[#4F4F4F]">
                {user?.firstName ||
                  user?.instructorDetails?.instructorName ||
                  "User"}
              </p>
              <p className="text-xs text-[#6B7280]">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              setIsMobileMenuOpen(false);
              await mutateAsync();
              setUser(null);
            }}
            className="w-full text-left py-2 px-3 text-red-500 rounded-lg hover:bg-red-50 transition font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
