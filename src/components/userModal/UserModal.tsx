import React from "react";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";

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
}: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 min-w-[410px] relative ${
        className || ""
      }`}
    >
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {inputs.map((input) => (
          <div>
            <p className="text-sm mb-1 opacity-[60%]">{input.placeholder}</p>
            <Input
              key={input.name}
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={input.onChange}
            />
          </div>
        ))}
        <Button type="submit" className="w-full">
          {buttonLabel}
        </Button>
      </form>
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
