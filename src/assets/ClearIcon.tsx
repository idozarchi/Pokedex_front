import * as React from "react";

export const ClearIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4l8 8M12 4l-8 8"
    />
  </svg>
);