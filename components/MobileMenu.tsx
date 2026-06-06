"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          ...
        </div>
      )}
    </>
  );
}