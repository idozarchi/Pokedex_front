import { Toaster } from "react-hot-toast";
import HeaderLogo from "../components/Header/header-logo";
import { HEADER_LOGO_SRC } from "../constants/header";
import { LoginBg } from "../assets/login-bg";
import UserModal from "../components/userModal/UserModal";
import { VerificationModal } from "../components/VerificationModal/verification-modal";
import { signOut } from "aws-amplify/auth";
import { useLoginState } from "../hooks/useLoginState.tsx";

(window as any).signOut = signOut;

export default function LoginPage() {
  const {
    modalProps,
    showVerification,
    verificationEmail,
    handleVerification,
    handleVerificationCancel,
    setModalType,
  } = useLoginState();

  return (
    <div className="flex flex-row w-full h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
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
