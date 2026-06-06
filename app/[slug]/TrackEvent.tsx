"use client";

import { useEffect } from "react";

export default function TrackEvent({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_slug: slug,
        event_type: "view",
      }),
    });
  }, [slug]);

  return null;
}