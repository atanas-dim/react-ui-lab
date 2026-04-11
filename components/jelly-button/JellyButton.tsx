"use client";

import "./JellyButton.css";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ButtonHTMLAttributes,
  type FC,
  type PointerEvent,
  type PointerEventHandler,
  type PropsWithChildren,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type ProcessingLight = {
  delay: number;
  duration: number;
};

const PROCESSING_LIGHTS: ProcessingLight[] = [
  { delay: 0, duration: 1.35 },
  { delay: 0.36, duration: 1.65 },
  { delay: 0.78, duration: 1.5 },
];

export type JellyButtonState = "idle" | "processing" | "success";

type JellyButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  labelClassName?: string;
  state?: JellyButtonState;
  animateLabel?: boolean;
};

const JellyButton: FC<JellyButtonProps> = ({
  children = "Label",
  className,
  labelClassName,
  state = "idle",
  animateLabel = true,

  onPointerMove,
  onPointerLeave,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotion();

  const btnRef = useRef<HTMLButtonElement>(null);

  const isIdle = state === "idle";
  const isProcessing = state === "processing";
  const isSuccess = state === "success";
  const isDisabled = rest.disabled;

  const setRotateValues = (e: PointerEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    // Update hover rotation from the pointer position relative to the button center.
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.setProperty("--btn-rotate-y", `${x * 0.05}deg`);
    btnRef.current.style.setProperty("--btn-rotate-x", `${y * -0.5}deg`);
  };

  const handlePointerMove: PointerEventHandler<HTMLButtonElement> = (e) => {
    setRotateValues(e);
    onPointerMove?.(e);
  };

  const resetRotateValues = () => {
    if (!btnRef.current) return;
    btnRef.current.style.setProperty("--btn-rotate-x", "0deg");
    btnRef.current.style.setProperty("--btn-rotate-y", "0deg");
  };

  const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (e) => {
    resetRotateValues();
    onPointerLeave?.(e);
  };

  const labelClasses = twMerge(
    // typography
    "z-1 text-sm leading-none font-semibold tracking-wide uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
    "flex items-center justify-center gap-1",

    isIdle && "text-pink-100",
    isProcessing && "text-purple-100",
    isSuccess && "text-teal-50",

    "group-disabled:text-neutral-100/60",

    labelClassName,
  );

  return (
    <button
      ref={btnRef}
      type="button"
      aria-busy={isProcessing}
      {...rest}
      className={twMerge(
        // base styles
        "group noise relative inline-flex h-12 min-w-40 items-center justify-center rounded-full px-6",

        // background colors
        "backdrop-blur-sm",
        isIdle && "bg-pink-600/50",
        isProcessing && "bg-purple-600/50",
        isSuccess && "bg-teal-600/50",
        "disabled:bg-neutral-300/50",

        // shadows
        "shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
        "hover:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_16px_36px_-14px_rgba(10,10,10,0.55)]",
        "disabled:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_12px_-12px_rgba(10,10,10,0.25)]",

        // focus ring
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",

        // press highlight
        "before:absolute before:top-1/2 before:left-1/2 before:h-1/3 before:w-7/10 before:-translate-x-1/2 before:-translate-y-1/3 before:rounded-full before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 active:before:opacity-100",
        isIdle && "before:bg-pink-100/60",
        isProcessing && "before:bg-purple-50/60",
        isSuccess && "before:bg-teal-50/60",
        isDisabled && "before:opacity-0!",

        // press shadow
        "after:absolute after:top-1/2 after:left-1/2 after:h-1/3 after:w-7/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:bg-(--btn-press-shadow) after:opacity-0 after:blur-sm after:transition-opacity after:duration-300 active:after:opacity-100",
        isIdle && "after:bg-pink-800/60",
        isProcessing && "after:bg-purple-800/60",
        isSuccess && "after:bg-teal-800/60",
        isDisabled && "after:opacity-0!",

        // transforms
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:hover:rotate-x-(--btn-rotate-x) motion-safe:hover:rotate-y-(--btn-rotate-y)",
        "motion-safe:active:translate-y-0 motion-safe:active:scale-[0.99]",
        "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:rotate-x-0 motion-reduce:hover:rotate-y-0",
        "motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
        "transition-all duration-300 ease-out",

        isDisabled &&
          "translate-y-0 scale-100 hover:translate-y-0 hover:scale-100 active:translate-y-0 active:scale-100",

        //cursor
        "cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed",

        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {!isDisabled && (
        <AnimatePresence initial={false}>
          {isProcessing && (
            <motion.span
              key="processing-lights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden"
            >
              {PROCESSING_LIGHTS.map(({ delay, duration }, index) => (
                <motion.span
                  key={index}
                  className="absolute top-1/2 block h-2/5 w-3/10 -translate-y-1/2 rounded-full bg-white/40 blur-md"
                  initial={{ x: "-100%" }}
                  animate={{ x: "300%", opacity: [0, 0.55, 0.3, 0.42, 0] }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.08, 0.55, 0.78, 1],
                  }}
                />
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      )}

      {animateLabel && !isDisabled ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={animateLabel ? state : "static"}
            initial={
              shouldReduceMotion ? { opacity: 0 } : { y: 14, opacity: 0 }
            }
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={labelClasses}
          >
            {children}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className={labelClasses}>{children}</span>
      )}
    </button>
  );
};

export default JellyButton;
