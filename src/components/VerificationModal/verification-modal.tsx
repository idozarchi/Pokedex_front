import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/Card/card";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";

type VerificationModalProps = {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
};

export function VerificationModal({
  email,
  onVerify,
  onCancel,
  isOpen,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onVerify(code.trim());
    } catch (err: any) {
      setError(err.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification code to {email}. Please enter the code
            below to complete your signup.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                className={
                  error ? "border-red-500 focus:border-red-500 m-2" : "m-2"
                }
                maxLength={6}
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm m-2">{error}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !code.trim()}
              className="flex-1"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
