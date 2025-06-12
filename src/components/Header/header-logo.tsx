type HeaderLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export const HeaderLogo = ({
  src,
  alt,
  className = "h-40 w-40 object-contain",
}: HeaderLogoProps) => (
  <div className="flex items-center">
    <img src={src} alt={alt} className={className} />
  </div>
);

export default HeaderLogo;
