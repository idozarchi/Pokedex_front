import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../components/Header/header-logo";
import { HEADER_LOGO_SRC } from "../constants/header";
import { LoginBg } from "../assets/login-bg";
import UserModal from "../components/userModal/UserModal";
import { VerificationModal } from "../components/VerificationModal/verification-modal";
import { signOut } from "aws-amplify/auth";
import { handleLogin, handleSignup } from "../api/auth-handlers";

(window as any).signOut = signOut;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [modalType, setModalType] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationFn, setVerificationFn] = useState<
    ((code: string) => Promise<void>) | null
  >(null);
  const navigate = useNavigate();

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

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleLogin(
        { email, password },
        () => {
          alert("Login successful!");
          navigate("/all-pokemons");
        },
        (errorMessage) => {
          alert(errorMessage);
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleSignup(
        {
          email: signupEmail,
          password: signupPassword,
          confirmPassword: signupConfirm,
        },
        () => {
          setModalType("login");
        },
        (errorMessage) => {
          alert(errorMessage);
        },
        (email, verifyFn) => {
          setVerificationEmail(email);
          setVerificationFn(() => verifyFn);
          setShowVerification(true);
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (code: string) => {
    if (verificationFn) {
      await verificationFn(code);
      setShowVerification(false);
      setModalType("login");
      alert("Signup and verification successful! You can now login.");
    }
  };

  const handleVerificationCancel = () => {
    setShowVerification(false);
    setVerificationFn(null);
    setVerificationEmail("");
  };

  const modalProps =
    modalType === "login"
      ? {
          title: "Login",
          inputs: loginInputs,
          buttonLabel: loading ? "Logging in..." : "Login",
          onSubmit: onLoginSubmit,
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
          buttonLabel: loading ? "Signing up..." : "Sign Up",
          onSubmit: onSignupSubmit,
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
        <VerificationModal
          isOpen={showVerification}
          email={verificationEmail}
          onVerify={handleVerification}
          onCancel={handleVerificationCancel}
        />
      </div>
    </div>
  );
}
