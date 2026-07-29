import Wrap from "./Wrap";

export default function PageBanner({ eyebrow, title, description }) {
  return (
    <Wrap className="pt-11 pb-2">
      <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3.5 py-1.5 text-[12.5px] text-moss before:content-['●'] before:text-[9px] before:text-stamp">
        {eyebrow}
      </div>
      <h1 className="mb-2 text-[32px] leading-[1.15] font-bold tracking-[-0.01em] text-heading">
        {title}
      </h1>
      <p className="max-w-[520px] text-[14.5px] text-muted">{description}</p>
    </Wrap>
  );
}
