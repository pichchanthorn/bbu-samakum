export default function Wrap({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-[1080px] px-8 max-[880px]:px-5 ${className}`}>
      {children}
    </div>
  );
}
