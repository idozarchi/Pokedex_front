type HeaderLogoProps = {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
};

export const HeaderLogo = ({
  src,
  alt,
  className = "h-14 w-37 object-contain",
  onClick,
}: HeaderLogoProps) => (
  <div
    className={`flex items-center ${
      onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
    }`}
    onClick={onClick}
  >
    <img src={src} alt={alt} className={className} />
  </div>
);

export default HeaderLogo;
