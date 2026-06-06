"use client";

type TrackedLinkProps = {
  slug: string;
  eventType: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TrackedLink({
  slug,
  eventType,
  href,
  children,
  className,
}: TrackedLinkProps) {
  async function trackClick() {
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_slug: slug,
        event_type: eventType,
      }),
    });
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      onClick={trackClick}
      className={className}
    >
      {children}
    </a>
  );
}