import * as React from "react";

type IconProps = {
  svg: React.ReactNode;
  className?: string;
};

export const Icon = ({ svg, className = "" }: IconProps) => (
  <div className={`icon-container ${className}`}>{svg}</div>
);

export default Icon;
