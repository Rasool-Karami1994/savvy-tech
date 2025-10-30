import { useEffect, useRef } from "react";

export default function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(0 0 0 / 0.8)" }}
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      />
      <div
        className="relative w-[92vw] max-w-xl rounded-2xl bg-main text-title shadow-xl ring-1 ring-border"
        style={{ boxShadow: "var(--shadow-elev-2)" }}
      >
        <div className="flex items-center justify-center gap-4 rounded-2xl rounded-b-none border-b border-border bg-main px-3 py-4">
          <h2 className="text-xl font-semibold text-title">{title}</h2>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
