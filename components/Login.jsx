"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function Login() {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <div>
      {isRegister ? (
        <LoginForm setIsRegister={setIsRegister} />
      ) : (
        <RegisterForm setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
