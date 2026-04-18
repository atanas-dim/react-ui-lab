"use client";

import "./JellyInput.css";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FC, InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { twJoin } from "tailwind-merge";

type JellyInputState = "idle" | "error" | "success";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  state?: JellyInputState;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

const labelVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const JellyInput: FC<Props> = ({
  state = "idle",
  label,
  leading,
  trailing,
  id,
  className,
  disabled,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id ?? `jelly-input-${autoId}`;
  const reduce = useReducedMotion();

  const shellBase = twJoin(
    "group relative w-full overflow-hidden rounded-2xl noise",
    "bg-neutral-100/95 shadow-[inset_0_-18px_28px_rgba(0,0,0,0.08),0_14px_24px_-18px_rgba(0,0,0,0.28)]",
    "transition-[background-color,box-shadow,transform] duration-300 ease-out",
    "focus-within:shadow-[inset_0_-18px_28px_rgba(0,0,0,0.1),0_18px_32px_-20px_rgba(0,0,0,0.34)]",
    state === "error" &&
      "bg-red-50/95 focus-within:bg-red-100/95 focus-within:shadow-[inset_0_-18px_28px_rgba(185,28,28,0.08),0_18px_32px_-20px_rgba(185,28,28,0.24)]",
    state === "success" &&
      "bg-green-50/95 focus-within:bg-green-100/95 focus-within:shadow-[inset_0_-18px_28px_rgba(5,150,105,0.08),0_18px_32px_-20px_rgba(5,150,105,0.22)]",
    disabled && "opacity-60",
    className,
  );

  const inputBase = twJoin(
    "peer relative z-10 block w-full border-0 bg-transparent px-4 pb-3 pt-7 text-sm",
    "text-neutral-800 placeholder:text-transparent outline-none",
    "disabled:cursor-not-allowed",
  );

  const stateClasses = {
    idle: "",
    error: "text-red-700 placeholder:text-red-300",
    success: "text-green-700 placeholder:text-green-300",
  } as const;

  return (
    <div className={shellBase}>
      {label && (
        <AnimatePresence mode="wait">
          {reduce ? (
            <motion.label
              key="label"
              htmlFor={inputId}
              className={twJoin(
                "pointer-events-none absolute top-2 left-4 z-20 text-[11px] font-medium tracking-wide",
                "text-neutral-500",
                stateClasses[state],
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {label}
            </motion.label>
          ) : (
            <motion.label
              key="label-motion"
              htmlFor={inputId}
              className={twJoin(
                "pointer-events-none absolute left-4 z-20 origin-left text-[11px] font-medium tracking-wide",
                "text-neutral-500 transition-colors",
                "top-2 scale-100",
                "peer-placeholder-shown:top-[calc(50%-2px)] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-110",
                "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:scale-100",
                stateClasses[state],
              )}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={labelVariants}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.label>
          )}
        </AnimatePresence>
      )}

      <div className="relative flex items-center">
        {leading && (
          <div className="pointer-events-none absolute top-7 left-4 z-20 text-neutral-400">
            {leading}
          </div>
        )}

        <input
          id={inputId}
          className={twJoin(
            inputBase,
            "peer",
            stateClasses[state],
            leading && "pl-10",
            trailing && "pr-10",
          )}
          disabled={disabled}
          aria-invalid={state === "error"}
          aria-disabled={disabled}
          {...rest}
        />

        {trailing && (
          <div className="pointer-events-none absolute top-7 right-4 z-20 text-neutral-400">
            {trailing}
          </div>
        )}
        <div
          aria-hidden="true"
          className={twJoin(
            "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl",
            "opacity-0 transition-opacity duration-200 ease-out",
            "group-focus-within:opacity-100",
          )}
        >
          <div className="absolute bottom-1 left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-full bg-black/10 opacity-0 blur-md transition-opacity duration-200 peer-active:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default JellyInput;
