"use client";

import React from "react";
import Highlights from "./Highlights";
import Guide from "./Guide";

export default function ProductHighlights() {
  return (
    <div className="bg-white dark:bg-[#393939] text-black min-h-screen py-20">
      <Highlights />
      <Guide />
    </div>
  );
}
