type PillButtonProps = {
  children?: string;
};

const PillButton = ({ children = "Launch" }: PillButtonProps) => {
  return (
    <button
      type="button"
      className="group inline-flex min-w-40 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 px-6 py-3 text-sm font-medium tracking-tight text-white shadow-[0_10px_24px_-12px_rgba(10,10,10,0.7)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-neutral-800 hover:shadow-[0_16px_36px_-14px_rgba(10,10,10,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
    </button>
  );
};

export default PillButton;
