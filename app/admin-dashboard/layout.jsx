/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect } from "react";
import AdminNav from "../../components/AdminDashboard/AdminNav.jsx";
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
      {user?.role === "admin" ? (
        <div className="flex justify-center">
          <AdminNav />
          <div className="w-full">{children}</div>
        </div>
      ) : (
        <div>
          <p>Access denied</p>
        </div>
      )}
    </>
  );
}
