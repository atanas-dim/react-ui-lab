"use client";

import "./JellyButton.css";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  type FC,
  type PointerEvent,
  type PointerEventHandler,
  type PropsWithChildren,
  useRef,
} from "react";
import { twJoin, twMerge } from "tailwind-merge";

type ProcessingLight = {
  delay: number;
  duration: number;
  className: string;
};

const PROCESSING_LIGHTS: ProcessingLight[] = [
  { delay: 0, duration: 1.35, className: "bg-white/40" },
  { delay: 0.36, duration: 1.65, className: "bg-black/40" },
  { delay: 0.78, duration: 1.5, className: "bg-white/40" },
];

export type JellyButtonState = "idle" | "processing" | "success";

type JellyButtonProps = PropsWithChildren<HTMLMotionProps<"button">> & {
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
    if (isDisabled) return;
    setRotateValues(e);
    onPointerMove?.(e);
  };

  const resetRotateValues = () => {
    if (!btnRef.current) return;
    btnRef.current.style.setProperty("--btn-rotate-x", "0deg");
    btnRef.current.style.setProperty("--btn-rotate-y", "0deg");
  };

  const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (e) => {
    if (isDisabled) return;
    resetRotateValues();
    onPointerLeave?.(e);
  };

  const labelClasses = twMerge(
    // typography
    "z-2 text-sm leading-none font-semibold tracking-wide uppercase text-shadow-[0_0px_6px_rgba(10,10,10,0.4)]",
    "flex items-center justify-center gap-1",

    isIdle && "text-pink-100",
    isProcessing && "text-indigo-100",
    isSuccess && "text-teal-50",

    "group-disabled:text-neutral-50/70",

    labelClassName,
  );

  return (
    <motion.button
      ref={btnRef}
      type="button"
      whileHover={
        shouldReduceMotion || isDisabled
          ? undefined
          : {
              y: [0, -4, -2],
              scaleX: [1, 1.06, 1.01],
              scaleY: [1, 0.98, 1.02],
            }
      }
      whileTap={
        shouldReduceMotion || isDisabled
          ? undefined
          : {
              y: 0,
              scaleX: [1, 0.97],
              scaleY: [0.99, 1.05],
            }
      }
      transition={{
        duration: 0.28,
        times: [0, 0.65, 1],
        ease: "easeOut",
      }}
      aria-busy={isProcessing}
      {...rest}
      className={twMerge(
        // base styles
        "group noise relative inline-flex h-12 min-w-40 items-center justify-center rounded-full px-6 select-none",

        // background
        "backdrop-blur-sm",
        isIdle && "bg-pink-600/60",
        isProcessing && "bg-indigo-600/60",
        isSuccess && "bg-teal-600/60",
        "disabled:bg-neutral-400/60",

        // shadows
        "shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_16px_-14px_rgba(10,10,10,0.55)]",
        "hover:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_16px_36px_-14px_rgba(10,10,10,0.55)]",
        "disabled:shadow-[inset_0px_-16px_16px_0px_rgba(10,10,10,0.6),0_12px_12px_-12px_rgba(10,10,10,0.25)]",

        // focus ring
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",

        // press highlight
        "before:absolute before:top-3/5 before:left-1/2 before:z-1 before:h-3/5 before:w-9/10 before:-translate-x-1/2 before:-translate-y-2/5 before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 active:before:opacity-100",
        isIdle &&
          "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-pink-100)_20%,transparent),transparent_60%)]",
        isProcessing &&
          "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-indigo-50)_20%,transparent),transparent_60%)]",
        isSuccess &&
          "before:bg-[radial-gradient(color-mix(in_oklab,var(--color-teal-50)_20%,transparent),transparent_60%)]",
        isDisabled && "before:opacity-0!",

        // press shadow
        "after:absolute after:top-3/7 after:left-1/2 after:z-1 after:h-1/2 after:w-9/10 after:-translate-x-1/2 after:-translate-y-3/4 after:rounded-full after:opacity-0 after:transition-opacity after:duration-300 active:after:opacity-100",
        isIdle &&
          "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-pink-900)_35%,transparent),transparent_60%)]",
        isProcessing &&
          "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-indigo-900)_35%,transparent),transparent_60%)]",
        isSuccess &&
          "after:bg-[radial-gradient(color-mix(in_oklab,var(--color-teal-900)_35%,transparent),transparent_60%)]",
        isDisabled && "after:opacity-0!",

        // // transforms
        // "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:hover:rotate-x-(--btn-rotate-x) motion-safe:hover:rotate-y-(--btn-rotate-y)",
        // "motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]",
        // "motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:hover:rotate-x-0 motion-reduce:hover:rotate-y-0",
        // "motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
        // "disabled:translate-y-0 disabled:scale-100 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:active:translate-y-0 disabled:active:scale-100",

        // transitions
        "transition-all duration-300 ease-out",

        isDisabled &&
          "translate-y-0 scale-100 hover:translate-y-0 hover:scale-100 active:translate-y-0 active:scale-100",

        //cursor
        "cursor-pointer disabled:cursor-not-allowed",

        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {!isDisabled && (
        <AnimatePresence initial={!animateLabel}>
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
              {PROCESSING_LIGHTS.map(
                ({ delay, duration, className }, index) => (
                  <motion.span
                    key={index}
                    className={twJoin(
                      "absolute top-1/2 block h-2/5 w-3/10 -translate-y-1/2 rounded-full blur-md",
                      className,
                    )}
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
                ),
              )}
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
    </motion.button>
  );
};

export default JellyButton;
