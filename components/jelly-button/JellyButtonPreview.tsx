"use client";

import { LoaderIcon, ThumbsUpIcon } from "lucide-react";
import { type FC, useState } from "react";

import JellyButton, { type JellyButtonState } from "./JellyButton";

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

    await delay(4600);

    setState("success");

    await delay(3200);

    setState("idle");
  };

  return (
    <div className="relative z-10 flex flex-col gap-3 perspective-midrange">
      <div className="absolute inset-0 -z-1 size-32 -translate-x-16 translate-y-6 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />
      <div className="absolute inset-0 -z-1 size-22 translate-x-33 translate-y-18 rounded-none bg-olive-400" />

      <JellyButton
        className="mx-auto min-w-50"
        state={state}
        onClick={handleClick}
      >
        {state === "idle" && "Launch"}
        {state === "processing" && (
          <>
            <LoaderIcon className="size-4.5 animate-spin" /> Processing...
          </>
        )}
        {state === "success" && (
          <>
            <ThumbsUpIcon className="size-4.5 translate-y-0.5 animate-bounce" />
            Success!
          </>
        )}
      </JellyButton>

      <JellyButton
        className="mx-auto min-w-50"
        state={state}
        onClick={handleClick}
        animateLabel={false}
      >
        Launch
      </JellyButton>

      <JellyButton
        className="mx-auto min-w-50"
        state={state}
        onClick={handleClick}
        animateLabel={false}
        disabled
      >
        Launch
      </JellyButton>
    </div>
  );
};

export default JellyButtonPreview;
