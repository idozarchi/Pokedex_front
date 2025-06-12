import React from "react";

type GameButtonProps = {
  title: string;
  svg: React.ReactNode;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
};

function GameButton({
  title,
  svg,
  imageUrl,
  className = "",
  onClick,
}: GameButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-36 h-36 bg-neutral-100 rounded-full shadow-lg overflow-hidden focus:outline-none border-4 border-black ${className}`}
      style={
        imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <span className="w-12 h-12 mb-1 flex items-center justify-center">
        {svg}
      </span>
      <span className="text-white text-2xl drop-shadow-md text-center [text-shadow:0_0_2px_black,0_1px_0_black,1px_0_0_black,-1px_0_0_black,0_-1px_0_black]">
        {title}
      </span>
    </button>
  );
}

export default GameButton;
