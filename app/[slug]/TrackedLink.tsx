"use client";

type TrackedLinkProps = {
  slug: string;
  eventType: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
};

export default function TrackedLink({
  slug,
  eventType,
  href,
  className,
  children,
  target,
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
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      onClick={trackClick}
    >
      {children}
    </a>
  );
}