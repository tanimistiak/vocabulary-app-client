"use client";
import React, { useState } from "react";
import api from "../utils/api";
import axios from "axios";
export default function RegisterForm({ setIsRegister }) {
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const image = form.get("image");
    const data = new FormData();
    data.append("image", image);
    await axios
      .post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_API}`,
        data,
      )
      .then(async (res) => {
        // console.log(res);
        try {
          const response = await api.post("/register", {
            ...formData,
            photoURL: res.data.data.display_url,
          });
          setMessage(response.data.message);
          setIsRegister(true);
        } catch (error) {
          setMessage("Registration failed");
        }
      })
      .catch((err) => console.log(err.data));
    /*  */
  };
  // console.log(message);
  return (
    <div>
      <form class="mx-auto max-w-md" onSubmit={handleSubmit}>
        <div class="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="name"
            id="floating_name"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            onChange={handleChange}
          />
          <label
            for="floating_name"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Name
          </label>
        </div>
        <div class="group relative z-0 mb-5 w-full">
          <input
            type="email"
            name="email"
            id="floating_email"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            onChange={handleChange}
          />
          <label
            for="floating_email"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Email address
          </label>
        </div>
        <div class="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="floating_password"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            onChange={handleChange}
          />
          <label
            for="floating_password"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4"
          >
            Password
          </label>
        </div>
        <div class="group relative z-0 mb-5 w-full">
          <label
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            for="user_avatar"
          >
            Upload file
          </label>
          <input
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            name="image"
          />
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="mb-5 flex items-start">
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Already a user?{" "}
              <button
                className="text-blue-500"
                onClick={() => setIsRegister(true)}
              >
                Login
              </button>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
}
