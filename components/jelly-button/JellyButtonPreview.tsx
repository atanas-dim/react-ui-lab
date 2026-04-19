"use client";

import { LoaderIcon, RocketIcon, ThumbsUpIcon } from "lucide-react";
import { type FC, useState } from "react";

import JellyButton, { type JellyButtonState } from "./JellyButton";

const PROCESSING_DELAY_MS = 2800;
const SUCCESS_DELAY_MS = 1400;

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const JellyButtonPreview: FC = () => {
  const [state, setState] = useState<JellyButtonState>("idle");

  const handleClick = async () => {
    if (state !== "idle") return;

    setState("processing");

    await delay(PROCESSING_DELAY_MS);

    setState("success");

    await delay(SUCCESS_DELAY_MS);

    setState("idle");
  };

  return (
    <div className="relative z-10 flex flex-col gap-3 perspective-midrange md:flex-row">
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-1 select-none">
        <div className="absolute top-6 -left-16 -z-1 size-28 rounded-xl border-6 border-neutral-700" />
        <div className="absolute -top-8 left-3/5 -z-1 size-32 rounded-full border-6 border-neutral-700" />
        <div className="absolute -right-10 -bottom-2/10 -z-1 size-22 rounded-sm border-6 border-neutral-700" />
      </div>

      <JellyButton
        className="mx-auto min-w-46"
        state={state}
        onClick={handleClick}
      >
        {state === "idle" && (
          <>
            <RocketIcon className="size-4.5" /> Launch
          </>
        )}
        {state === "processing" && (
          <>
            <LoaderIcon className="size-4.5 animate-spin group-disabled:animate-none" />{" "}
            Processing...
          </>
        )}
        {state === "success" && (
          <>
            <ThumbsUpIcon className="size-4.5 translate-y-0.5 animate-bounce group-disabled:animate-none" />
            Success!
          </>
        )}
      </JellyButton>

      <JellyButton
        className="mx-auto min-w-46"
        state={"success"}
        animateLabel={false}
      >
        <ThumbsUpIcon className="size-4.5 -translate-y-0.5" />
        Success!
      </JellyButton>

      <JellyButton
        className="mx-auto min-w-46"
        state={state}
        onClick={handleClick}
        disabled
      >
        <RocketIcon className="size-4.5" /> Launch
      </JellyButton>
    </div>
  );
};

export default JellyButtonPreview;
