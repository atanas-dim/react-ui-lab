"use client";

import "./styles.css";

import {
  type ButtonHTMLAttributes,
  type FC,
  type PointerEventHandler,
  type PropsWithChildren,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type PillButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  labelClassName?: string;
};

const PillButton: FC<PillButtonProps> = ({
  children = "Label",
  className,
  labelClassName,
  onPointerMove,
  onPointerLeave,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePointerMove: PointerEventHandler<HTMLButtonElement> = (e) => {
    if (!btnRef.current) return;
    // here we have to check the x position of the pointer relative to the button's center, and set a CSS variable that will be used in the hover transform
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.setProperty("--btn-rotate-y", `${x * 0.05}deg`);
    btnRef.current.style.setProperty("--btn-rotate-x", `${y * -0.5}deg`);
    onPointerMove?.(e);
  };

  const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (e) => {
    if (!btnRef.current) return;
    // reset the CSS variable on pointer up, so the button goes back to its original position
    btnRef.current.style.setProperty("--btn-rotate-x", `0deg`);
    btnRef.current.style.setProperty("--btn-rotate-y", `0deg`);

    onPointerLeave?.(e);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      {...rest}
      className={twMerge(
        // base styles
        "jelly-btn noise group noise relative inline-flex min-w-40 items-center justify-center rounded-full px-6 py-3.5",
        // base background
        "bg-(--btn-bg-color) backdrop-blur-sm",
        // press effect layers
        "before:absolute before:top-1/2 before:left-1/2 before:h-1/2 before:w-7/10 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-(--btn-press-highlight) before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 active:before:opacity-100",
        "after:absolute after:top-2/5 after:left-1/2 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-(--btn-press-shadow) after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 active:after:opacity-100",
        // focus ring
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",
        // shadows
        "shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
        "hover:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_16px_36px_-14px_rgba(10,10,10,0.55)]",
        // transforms
        "hover:-translate-y-0.5 hover:scale-[1.02] hover:rotate-x-(--btn-rotate-x) hover:rotate-y-(--btn-rotate-y)",
        "active:translate-y-0 active:scale-[0.99]",
        // transition
        "transition-all duration-300 ease-out",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span
        className={twMerge(
          // typography
          "text-sm font-semibold tracking-wide text-(--btn-text-color) uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
          //transforms
          "z-1 group-hover:-translate-y-0.5 group-active:-translate-y-px group-active:scale-98",
          // transition
          "transition-transform duration-300",
          labelClassName,
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default PillButton;

export const PillButtonPreview: FC = () => {
  return (
    <div className="relative z-10 perspective-[200px]">
      <div className="absolute inset-0 -z-1 size-26 -translate-x-16 translate-y-6 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />

      <PillButton className="mx-auto">Launch</PillButton>
    </div>
  );
};
