"use client";

import { SearchIcon, UserIcon } from "lucide-react";
import type { FC } from "react";
import JellyInput from "./JellyInput";
import JellyButtonPreview from "../jelly-button/JellyButtonPreview";

const JellyInputPreview: FC = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="w-full max-w-sm">
          <label className="mb-2 block text-xs font-medium text-neutral-600">
            Default
          </label>
          <JellyInput placeholder="Your name" label="Full name" />
        </div>

        <div className="w-full max-w-sm">
          <label className="mb-2 block text-xs font-medium text-neutral-600">
            With leading/trailing
          </label>
          <JellyInput
            placeholder="Search"
            label="Search"
            leading={<SearchIcon className="size-4 text-neutral-400" />}
            trailing={<UserIcon className="size-4 text-neutral-400" />}
          />
        </div>

        <div className="w-full max-w-sm">
          <label className="mb-2 block text-xs font-medium text-neutral-600">
            Error
          </label>
          <JellyInput placeholder="Email" label="Email" state="error" />
        </div>

        <div className="w-full max-w-sm">
          <label className="mb-2 block text-xs font-medium text-neutral-600">
            Success
          </label>
          <JellyInput placeholder="Nickname" label="Nickname" state="success" />
        </div>

        <div className="w-full max-w-sm">
          <label className="mb-2 block text-xs font-medium text-neutral-600">
            Disabled
          </label>
          <JellyInput placeholder="Can't edit" label="Disabled" disabled />
        </div>
      </div>
      <JellyButtonPreview />
    </div>
  );
};

export default JellyInputPreview;
