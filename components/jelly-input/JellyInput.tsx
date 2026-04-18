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
  const isIdle = state === "idle";
  const isError = state === "error";
  const isSuccess = state === "success";

  const shellBase = twJoin(
    "group relative w-full overflow-hidden rounded-2xl noise",
    "bg-neutral-100/95 shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.2),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
    "before:content-[''] after:content-['']",
    "before:pointer-events-none before:absolute before:top-3/5 before:left-1/2 before:z-10 before:h-1/3 before:w-7/10 before:-translate-x-1/2 before:-translate-y-2/5 before:rounded-full before:bg-neutral-50/20 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 focus-within:before:opacity-100",
    "after:pointer-events-none after:absolute after:top-2/5 after:left-1/2 after:z-10 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:bg-neutral-900/10 after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 focus-within:after:opacity-100",
    "focus-within:shadow-[inset_0px_-6px_10px_0px_rgba(10,10,10,0.15),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
    "disabled:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.2),0_12px_12px_-12px_rgba(10,10,10,0.25)]",
    isError && "bg-red-50/95 focus-within:bg-red-100/95",
    isSuccess && "bg-green-50/95 focus-within:bg-green-100/95",
    "transition-all duration-300 ease-out",
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
                isError && stateClasses.error,
                isSuccess && stateClasses.success,
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
                isError && stateClasses.error,
                isSuccess && stateClasses.success,
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
            isError && stateClasses.error,
            isSuccess && stateClasses.success,
            leading && "pl-10",
            trailing && "pr-10",
          )}
          disabled={disabled}
          aria-invalid={isError}
          aria-disabled={disabled}
          {...rest}
        />

        {trailing && (
          <div className="pointer-events-none absolute top-7 right-4 z-20 text-neutral-400">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
};

export default JellyInput;
