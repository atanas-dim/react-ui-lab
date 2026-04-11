"use client";

import "./JellyButton.css";

import {
  type ButtonHTMLAttributes,
  type FC,
  type PointerEventHandler,
  type PropsWithChildren,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type JellyButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  labelClassName?: string;
};

const JellyButton: FC<JellyButtonProps> = ({
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
    // Update hover rotation from the pointer position relative to the button center.
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.setProperty("--btn-rotate-y", `${x * 0.05}deg`);
    btnRef.current.style.setProperty("--btn-rotate-x", `${y * -0.5}deg`);
    onPointerMove?.(e);
  };

  const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (e) => {
    if (!btnRef.current) return;
    btnRef.current.style.setProperty("--btn-rotate-x", "0deg");
    btnRef.current.style.setProperty("--btn-rotate-y", "0deg");

    onPointerLeave?.(e);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      {...rest}
      className={twMerge(
        // base styles
        "group noise relative inline-flex min-w-40 items-center justify-center rounded-full px-6 py-3.5",
        // base background
        "bg-pink-600/50 backdrop-blur-sm hover:bg-purple-600/50 active:bg-teal-600/50",
        // shadows
        "shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
        "hover:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_16px_36px_-14px_rgba(10,10,10,0.55)]",
        // focus ring
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",
        // press highlight
        "before:absolute before:top-1/2 before:left-1/2 before:h-1/3 before:w-7/10 before:-translate-x-1/2 before:-translate-y-1/3 before:rounded-full before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 active:before:opacity-100",
        "before:bg-pink-100/60 hover:before:bg-purple-50/60 active:before:bg-teal-50/60",
        // press shadow
        "after:absolute after:top-1/2 after:left-1/2 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:bg-(--btn-press-shadow) after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 active:after:opacity-100",
        "after:bg-pink-800/60 hover:after:bg-purple-800/60 active:after:bg-teal-800/60",
        // transforms
        "hover:-translate-y-0.5 hover:scale-[1.02] hover:rotate-x-(--btn-rotate-x) hover:rotate-y-(--btn-rotate-y)",
        "active:translate-y-0 active:scale-[0.99]",
        "transition-all duration-300 ease-out",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span
        className={twMerge(
          // typography
          "text-sm font-semibold tracking-wide uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
          "text-pink-100 group-hover:text-purple-100 group-active:text-teal-50",
          // transforms
          "z-1 group-hover:-translate-y-0.5 group-active:-translate-y-px group-active:scale-98",
          "transition-transform duration-300",
          labelClassName,
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default JellyButton;
