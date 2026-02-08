import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../ui/CircularLoader/CircularLoader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader text="Authenticating..." />
      </div>
    );
  }

  // If not authenticated, return null (navigation will happen)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
