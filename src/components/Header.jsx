import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { UserContext } from "../UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="md:px-25 px-5 py-3 h-20 bg-[#F4E1FD70] rounded-b-[50px] flex justify-between items-center">
      <img src="/logo2.png" alt="Logo" className="object-cover" />
      <nav className="flex gap-4 items-center font-kumbh text-[#4F4F4F] font-medium">
        <NavLink to={"/"} className={``}>
          Dashboard
        </NavLink>
        <NavLink to={"/students"}>Students</NavLink>
        <NavLink to={"/class"}>Class</NavLink>
        <NavLink to={"/community"}>Community</NavLink>
      </nav>
      <div className="flex gap-5 items-center">
        <GoBell size={22} />
        <div className="flex gap-2 items-center font-plus">
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

          <div className="flex flex-col gap-1">
            <p className=" font-semibold">
              Hello,{" "}
              {user?.firstName || user?.instructorDetails?.instructorName}
            </p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
