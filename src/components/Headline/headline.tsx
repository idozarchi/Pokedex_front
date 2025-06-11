import * as React from "react";

type HeadlineProps = {
  children: React.ReactNode;
  className?: string;
};

export const Headline = ({ children, className = "" }: HeadlineProps) => (
  <h1
    className={`font-mulish font-medium leading-[34px] tracking-[0px] text-gray-900 ${className}`}
    style={{ fontWeight: 500 }}
  >
    {children}
  </h1>
);

export default Headline;
