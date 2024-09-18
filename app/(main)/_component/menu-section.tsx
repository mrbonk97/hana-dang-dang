import { Dispatch, SetStateAction, useState } from "react";

interface MenuSectionProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export const MenuSection = ({ mode, setMode }: MenuSectionProps) => {
  return (
    <section className="mt-5 flex items-end gap-5 font-bold opacity-80">
      <button
        onClick={() => setMode("all")}
        aria-pressed={mode == "all"}
        className="text-4xl duration-150 aria-pressed:text-c1-300"
      >
        전체
      </button>
      <button
        onClick={() => setMode("domestic")}
        aria-pressed={mode == "domestic"}
        className="text-3xl duration-150 aria-pressed:text-c1-300"
      >
        국내
      </button>
      <button
        onClick={() => setMode("foreign")}
        aria-pressed={mode == "foreign"}
        className="text-3xl duration-150 aria-pressed:text-c1-300"
      >
        해외
      </button>
    </section>
  );
};
