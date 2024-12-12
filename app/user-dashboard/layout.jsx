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
          <div class="p-4 sm:ml-64">
            <div class="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Access denied</p>
        </div>
      )}
    </>
  );
}
