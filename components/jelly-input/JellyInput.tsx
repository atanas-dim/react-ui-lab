"use client";

import "./JellyInput.css";

import type { FC, InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type JellyInputState = "idle" | "error" | "success";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  state?: JellyInputState;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
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
  const isIdle = state === "idle";
  const isError = state === "error";
  const isSuccess = state === "success";
  const { placeholder, ...inputProps } = rest;
  const inputPlaceholder = placeholder ?? " ";

  const shellBase = twMerge(
    // base styles
    "group relative w-full overflow-hidden rounded-2xl noise",

    // background
    "backdrop-blur-sm",
    isIdle && "bg-neutral-50/60 focus-within:bg-neutral-100/60",
    isError && "bg-red-100/60 focus-within:bg-red-200/60",
    isSuccess && "bg-green-100/60 focus-within:bg-green-200/60",

    // shadows
    "shadow-[inset_0px_-10px_16px_0px_rgba(10,10,10,0.2),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
    "focus-within:shadow-[inset_0px_-6px_10px_0px_rgba(10,10,10,0.15),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
    "disabled:shadow-[inset_0px_-10px_16px_0px_rgba(10,10,10,0.2),0_12px_12px_-12px_rgba(10,10,10,0.25)]",

    // press highlight
    "before:pointer-events-none before:absolute before:top-4/5 before:left-1/2 before:z-1 before:h-1/2 before:w-7/10 before:-translate-x-1/2 before:-translate-y-2/5 before:rounded-full before:opacity-0 motion-safe:before:transition-opacity motion-safe:before:duration-300 focus-within:before:opacity-100",
    isIdle &&
      "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-neutral-100)_70%,transparent),transparent_60%)]",
    isError &&
      "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-red-100)_70%,transparent),transparent_60%)]",
    isSuccess &&
      "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-green-100)_70%,transparent),transparent_60%)]",

    // press shadow
    "after:pointer-events-none after:absolute after:top-2/5 after:left-1/2 after:z-1 after:h-3/5 after:w-9/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:opacity-0 motion-safe:after:transition-opacity motion-safe:after:duration-300 focus-within:after:opacity-100",
    isIdle &&
      "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-neutral-900)_10%,transparent),transparent_60%)]",
    isError &&
      "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-red-900)_10%,transparent),transparent_60%)]",
    isSuccess &&
      "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-green-900)_10%,transparent),transparent_60%)]",

    //focus ring
    "focus-within:ring focus-within:ring-offset-2 focus-within:outline-none",
    isIdle && "focus-within:ring-neutral-400",
    isError && "focus-within:ring-red-400",
    isSuccess && "focus-within:ring-green-400",

    // transitions
    "motion-safe:transition-all  motion-safe:duration-300 ease-out",
    disabled && "opacity-60",
    className,
  );

  const inputBase = twJoin(
    // input base styles
    "peer relative z-10 block w-full border-0 bg-transparent px-4 pb-2.5 pt-5.5 placeholder-shown:pb-4 placeholder-shown:pt-4 ",
    "text-base text-neutral-800 placeholder:text-transparent outline-none",
    "disabled:cursor-not-allowed",
  );

  // state colors
  const stateClasses = {
    idle: "text-neutral-800",
    error: "text-red-700",
    success: "text-green-700",
  } as const;

  return (
    <div className={shellBase}>
      <div className="relative flex items-center">
        {leading && (
          <div className="pointer-events-none absolute top-4.5 left-4 z-20 text-neutral-400">
            {leading}
          </div>
        )}

        <input
          id={inputId}
          className={twMerge(
            inputBase,
            isError && stateClasses.error,
            isSuccess && stateClasses.success,
            leading && "pl-10",
            trailing && "pr-10",
          )}
          placeholder={inputPlaceholder}
          disabled={disabled}
          aria-invalid={isError}
          aria-disabled={disabled}
          {...inputProps}
        />

        {trailing && (
          <div className="pointer-events-none absolute top-4.5 right-4 z-20 text-neutral-400">
            {trailing}
          </div>
        )}

        {label && (
          <label
            htmlFor={inputId}
            className={twMerge(
              "pointer-events-none absolute top-2 left-4 z-20 origin-left font-medium tracking-wide",
              leading && "left-10",
              "text-[10px] font-medium text-neutral-500",
              "peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal",
              "ease-out motion-safe:transition-all motion-safe:duration-300",
              isError && stateClasses.error,
              isSuccess && stateClasses.success,
            )}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default JellyInput;
