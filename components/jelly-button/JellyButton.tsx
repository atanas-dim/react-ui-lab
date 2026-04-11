"use client";

import "./JellyButton.css";

import {
  type ButtonHTMLAttributes,
  type FC,
  type PointerEventHandler,
  type PropsWithChildren,
  type ReactNode,
  useRef,
} from "react";
import { twJoin, twMerge } from "tailwind-merge";

export type JellyButtonState = "idle" | "processing" | "success";

type JellyButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  labelClassName?: string;
  state?: JellyButtonState;
  stateContent?: Partial<Record<JellyButtonState, ReactNode>>;
};

const JellyButton: FC<JellyButtonProps> = ({
  children = "Label",
  className,
  labelClassName,
  state = "idle",
  stateContent,
  onPointerMove,
  onPointerLeave,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const resolvedContent = stateContent?.[state] ?? children;

  const isIdle = state === "idle";
  const isProcessing = state === "processing";
  const isSuccess = state === "success";
  const isDisabled = rest.disabled;

  const handlePointerMove: PointerEventHandler<HTMLButtonElement> = (e) => {
    if (!btnRef.current || isDisabled) return;
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
        // background colors
        twJoin(
          "backdrop-blur-sm",
          isIdle && "bg-pink-600/50",
          isProcessing && "bg-purple-600/50",
          isSuccess && "bg-teal-600/50",
        ),
        // shadows
        "shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
        "hover:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_16px_36px_-14px_rgba(10,10,10,0.55)]",
        // focus ring
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",
        // press highlight
        "before:absolute before:top-1/2 before:left-1/2 before:h-1/3 before:w-7/10 before:-translate-x-1/2 before:-translate-y-1/3 before:rounded-full before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 active:before:opacity-100",
        twJoin(
          isIdle && "before:bg-pink-100/60",
          isProcessing && "before:bg-purple-50/60",
          isSuccess && "before:bg-teal-50/60",
        ),
        // press shadow
        "after:absolute after:top-1/2 after:left-1/2 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:bg-(--btn-press-shadow) after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 active:after:opacity-100",
        twJoin(
          isIdle && "after:bg-pink-800/60",
          isProcessing && "after:bg-purple-800/60",
          isSuccess && "after:bg-teal-800/60",
        ),
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
          twJoin(
            isIdle && "text-pink-100",
            isProcessing && "text-purple-100",
            isSuccess && "text-teal-50",
          ),
          // transforms
          "z-1 group-hover:-translate-y-0.5 group-active:-translate-y-px group-active:scale-98",
          "transition-transform duration-300",
          labelClassName,
        )}
      >
        {resolvedContent}
      </span>
    </button>
  );
};

export default JellyButton;
