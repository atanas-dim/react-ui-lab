import { twJoin, twMerge } from "tailwind-merge";

type PillButtonProps = {
  children?: string;
  className?: string;
};

const PillButton = ({ children = "Launch", className }: PillButtonProps) => {
  return (
    <div className="relative z-10">
      <div className="absolute inset-0 -z-1 -translate-x-1/2 translate-y-1/3 bg-blue-400" />
      <button
        type="button"
        className={twMerge(
          "group relative inline-flex min-w-40 items-center justify-center rounded-full px-6 py-3",
          "text-sm font-medium tracking-tight text-white",
          "bg-pink-500/60 backdrop-blur-sm",

          "before:absolute before:top-1/2 before:left-1/2 before:h-1/2 before:w-7/10 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-pink-100/60 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 active:before:opacity-100",
          "after:absolute after:top-2/5 after:left-1/2 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-pink-700/70 after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 active:after:opacity-100",

          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",
          "hover:-translate-y-0.5 hover:scale-[1.02]",

          "shadow-[inset_0px_-4px_16px_0px_rgba(10,10,10,0.4),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
          "hover:shadow-[inset_0px_-4px_16px_0px_rgba(10,10,10,0.4),0_16px_36px_-14px_rgba(10,10,10,0.55)]",

          "active:translate-y-0 active:scale-[0.99]",
          "transition-all duration-300 ease-out",
          className,
        )}
      >
        <span className="z-1 transition-transform duration-300 group-hover:-translate-y-px group-active:translate-y-px">
          {children}
        </span>
      </button>
    </div>
  );
};

export default PillButton;
