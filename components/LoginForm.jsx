"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import auth from "../firebase.config";
import api from "@/utils/api";
import { useUser } from "@/contexts/userContext";
import axios from "axios";

export default function LoginForm({ setIsRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { user, setUser } = useUser();
  // console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hello");

    try {
      setError("");
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const idToken = await userCredential.user.getIdToken();

      const res = await api.post("/login", { idToken });

      setUser({ email: formData.email, role: res.data.role });
      setLoading(false);
      if (res.data.role === "user") {
        router.push("/user-dashboard/lesson");
      }
      if (res.data.role === "admin") {
        router.push("/admin-dashboard");
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  };
  useEffect(() => {
    api.get("/me").then((data) => {
      if (data.data.role === "admin") {
        router.push("/admin-dashboard");
      } else if (data.data.role === "user") {
        router.push("/user-dashboard/lesson");
      } else {
        router.push("/");
      }
    });
  }, []);
  return (
    <div>
      <form class="mx-auto max-w-sm" onSubmit={handleSubmit}>
        <div class="mb-5">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5 flex items-start">
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Not a user?{" "}
            <button
              className="text-blue-500"
              onClick={() => setIsRegister(false)}
            >
              Register
            </button>
          </label>
        </div>
        {error ? <p className="text-red-600">{error}</p> : ""}
        {!loading ? (
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        ) : (
          <LoadingSpinner />
        )}
      </form>
    </div>
  );
}
