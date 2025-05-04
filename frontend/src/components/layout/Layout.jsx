import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Layout = () => {
  const user = useSelector((store) => store.user.user);

  return (
    <>
      {user && <NavBar />}
      <Outlet />
    </>
  );
};

export default Layout;
