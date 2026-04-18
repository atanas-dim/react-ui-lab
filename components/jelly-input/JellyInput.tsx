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
    "border border-neutral-200/90 bg-neutral-100/95",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-16px_28px_rgba(0,0,0,0.06),0_14px_24px_-18px_rgba(0,0,0,0.35)]",
    "transition-[border-color,box-shadow,transform] duration-300 ease-out",
    "focus-within:border-neutral-300 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_28px_rgba(0,0,0,0.07),0_18px_32px_-20px_rgba(0,0,0,0.42)]",
    state === "error" &&
      "border-red-400/80 focus-within:border-red-500 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_28px_rgba(185,28,28,0.06),0_18px_32px_-20px_rgba(185,28,28,0.28)]",
    state === "success" &&
      "border-green-400/80 focus-within:border-green-500 focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_28px_rgba(5,150,105,0.06),0_18px_32px_-20px_rgba(5,150,105,0.24)]",
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
                "pointer-events-none absolute top-3 left-4 z-20 text-[11px] font-medium tracking-wide",
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
                "top-3 scale-100",
                "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-110",
                "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:scale-100",
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
          <div className="pointer-events-none absolute top-1/2 left-4 z-20 -translate-y-1/2 text-neutral-400">
            {leading}
          </div>
        )}

        <input
          id={inputId}
          className={twJoin(
            inputBase,
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
          <div className="pointer-events-none absolute top-1/2 right-4 z-20 -translate-y-1/2 text-neutral-400">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
};

export default JellyInput;
