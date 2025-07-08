import React, { useState } from "react";
import HeaderLogo from "../components/Header/header-logo";
import { HEADER_LOGO_SRC } from "../constants/header";
import { LoginBg } from "../assets/login-bg";
import UserModal from "../components/userModal/UserModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [modalType, setModalType] = useState<"login" | "signup">("login");

  const loginInputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  const signupInputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: signupEmail,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSignupEmail(e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: signupPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSignupPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: signupConfirm,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSignupConfirm(e.target.value),
    },
  ];

  const modalProps =
    modalType === "login"
      ? {
          title: "Login",
          inputs: loginInputs,
          buttonLabel: "Login",
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // handle login logic here
          },
          className: "w-50",
          label: (
            <>
              {"Don't have an account? "}
              <span
                className="cursor-pointer text-blue-500 underline"
                onClick={() => setModalType("signup")}
              >
                Sign up
              </span>
            </>
          ),
          pText: (
            <>
              <span
                className="cursor-pointer text-blue-500 underline"
                onClick={() => setModalType("signup")}
              >
                {"Forgot password?"}
              </span>
            </>
          ),
        }
      : {
          title: "Sign Up",
          inputs: signupInputs,
          buttonLabel: "Sign Up",
          onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // handle signup logic here
          },
          className: "w-50",
          label: (
            <>
              {"Already have an account? "}
              <span
                className="cursor-pointer text-blue-500 underline"
                onClick={() => setModalType("login")}
              >
                Login
              </span>
            </>
          ),
          pText: "",
        };

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[35%] h-full bg-primary-300 flex items-center justify-center">
        <HeaderLogo src={HEADER_LOGO_SRC} alt={"App Logo"} className="w-70" />
      </div>
      <div className="w-[65%] h-full relative justify-center items-center flex">
        <LoginBg className="absolute inset-0 w-full h-full object-cover"></LoginBg>
        <UserModal
          isOpen={true}
          onClose={() => setModalType("login")}
          {...modalProps}
        />
      </div>
    </div>
  );
}
