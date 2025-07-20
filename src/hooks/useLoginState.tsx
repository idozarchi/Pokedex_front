import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleLogin, handleSignup } from "../api/auth-handlers";

export type UseLoginStateReturn = {
  modalProps: any;
  showVerification: boolean;
  verificationEmail: string;
  handleVerification: (code: string) => Promise<void>;
  handleVerificationCancel: () => void;
  setModalType: (type: "login" | "signup") => void;
};

export function useLoginState(): UseLoginStateReturn {
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
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/all-pokemons");
          }, 1000);
        },
        (errorMessage) => {
          toast.error(errorMessage);
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
          toast.error(errorMessage);
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
      toast.success("Signup and verification successful! You can now login.");
    }
  };

  const handleVerificationCancel = () => {
    setShowVerification(false);
    setVerificationFn(null);
    setVerificationEmail("");
  };

  const passwordPolicy = (
    <div className="text-xs text-left">
      <div className="font-semibold mb-2">Password Requirements:</div>
      <ul className="list-disc list-inside space-y-1">
        <li>At least 8 characters long</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one special character</li>
      </ul>
    </div>
  );

  const modalProps =
    modalType === "login"
      ? {
          title: "Login",
          inputs: loginInputs,
          buttonLabel: loading ? "Logging in..." : "Login",
          onSubmit: onLoginSubmit,
          className: "w-50",
          passwordPolicy: passwordPolicy,
          label: (
            <>
              {"Don't have an account? "}
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => setModalType("signup")}
              >
                Sign up
              </span>
            </>
          ),
          pText: (
            <>
              <span
                className="cursor-pointer text-blue-500"
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
          passwordPolicy: passwordPolicy,
          label: (
            <>
              {"Already have an account? "}
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => setModalType("login")}
              >
                Login
              </span>
            </>
          ),
          pText: "",
        };

  return {
    modalProps,
    showVerification,
    verificationEmail,
    handleVerification,
    handleVerificationCancel,
    setModalType,
  };
}
