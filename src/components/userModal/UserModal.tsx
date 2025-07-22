import React, { useState } from "react";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import { Eye, EyeOff, Info } from "lucide-react";

type InputField = {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputs: InputField[];
  buttonLabel: string;
  label?: React.ReactNode;
  pText?: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  passwordPolicy?: React.ReactNode;
  additionalContent?: React.ReactNode; // <-- add this
}

function UserModal({
  isOpen,
  title,
  inputs,
  buttonLabel,
  label,
  pText,
  onSubmit,
  className,
  passwordPolicy,
  additionalContent, // <-- add this
}: UserModalProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [showTooltip, setShowTooltip] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const togglePasswordVisibility = (inputName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 min-w-[410px] relative ${
        className || ""
      }`}
    >
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {inputs.map((input) => {
          const isPasswordField = input.type === "password";
          const isPasswordVisible = showPasswords[input.name];
          const inputType =
            isPasswordField && isPasswordVisible ? "text" : input.type;

          return (
            <div key={input.name}>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm opacity-[60%]">{input.placeholder}</p>
                {isPasswordField &&
                  passwordPolicy &&
                  input.name === "password" && (
                    <div className="relative">
                      <Info
                        size={14}
                        className="text-gray-400 cursor-help"
                        onMouseEnter={() =>
                          setShowTooltip((prev) => ({
                            ...prev,
                            [input.name]: true,
                          }))
                        }
                        onMouseLeave={() =>
                          setShowTooltip((prev) => ({
                            ...prev,
                            [input.name]: false,
                          }))
                        }
                      />
                      {showTooltip[input.name] && (
                        <div className="absolute left-0 top-6 z-50 bg-gray-800 text-white text-xs rounded-md p-3 shadow-lg min-w-[280px]">
                          <div className="absolute -top-1 left-2 W-2 h-2 bg-gray-800 rotate-45"></div>
                          {passwordPolicy}
                        </div>
                      )}
                    </div>
                  )}
              </div>
              <div className="relative">
                <Input
                  name={input.name}
                  type={inputType}
                  value={input.value}
                  onChange={input.onChange}
                  className={isPasswordField ? "pr-10" : ""}
                />
                {isPasswordField && (
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(input.name)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <Button type="submit" className="w-full">
          {buttonLabel}
        </Button>
      </form>
      {additionalContent && <div className="mt-2">{additionalContent}</div>}
      <div className="text-center justify-center items-center flex flex-col gap-8">
        {pText && <p className="mt-3 text-xs text-gray-500">{pText}</p>}
        {label && (
          <div className="block mt-4 text-sm text-gray-600">{label}</div>
        )}
      </div>
    </div>
  );
}

export default UserModal;
