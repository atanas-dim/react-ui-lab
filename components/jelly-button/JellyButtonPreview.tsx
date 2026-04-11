"use client";

import { type FC, useEffect, useRef, useState } from "react";

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

    await delay(13200);

    setState("success");

    await delay(1800);

    setState("idle");
  };

  return (
    <div className="relative z-10 perspective-[200px]">
      <div className="absolute inset-0 -z-1 size-26 -translate-x-16 translate-y-6 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />

      <JellyButton
        className="mx-auto"
        state={state}
        stateContent={{
          idle: "Launch",
          processing: "Processing...",
          success: "Success",
        }}
        onClick={handleClick}
      >
        Launch
      </JellyButton>
    </div>
  );
};

export default JellyButtonPreview;
