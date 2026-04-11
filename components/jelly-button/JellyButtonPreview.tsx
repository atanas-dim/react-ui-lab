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
    <div className="relative z-10 perspective-[200px]">
      <div className="absolute inset-0 -z-1 size-26 -translate-x-16 translate-y-6 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />

      <JellyButton
        className="mx-auto min-w-50"
        state={state}
        stateContent={{
          idle: "Launch",
          processing: (
            <>
              <LoaderIcon className="size-4.5 animate-spin" /> Processing...
            </>
          ),
          success: (
            <>
              <ThumbsUpIcon className="size-4.5 translate-y-0.5 animate-bounce" />
              Success!
            </>
          ),
        }}
        onClick={handleClick}
      >
        Launch
      </JellyButton>
    </div>
  );
};

export default JellyButtonPreview;
