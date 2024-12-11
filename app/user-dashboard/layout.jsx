/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect } from "react";
import SideNav from "../../components/UserDashboard/SideNav";
import api from "@/utils/api";
import { useUser } from "@/contexts/userContext";
export default function layout({ children }) {
  const { user, setUser } = useUser();
  useEffect(() => {
    api.get("/me").then((data) => setUser(data.data));
    // console.log("hello");
  }, []);
  return (
    <>
      {user?.role === "user" ? (
        <div>
          <SideNav />
          <div>{children}</div>
        </div>
      ) : (
        <div>
          <p>Access denied</p>
        </div>
      )}
    </>
  );
}
