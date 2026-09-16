export default function HeroSection({ children, className = "" }) {
  return <section className={`public-shared-hero ${className}`}>{children}</section>;
}
