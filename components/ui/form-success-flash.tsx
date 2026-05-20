import { cn } from "@/lib/utils";

interface FormSuccessFlashProps {
  title: string;
  message: string;
  className?: string;
  overlay?: boolean;
}

export function FormSuccessFlash({
  title,
  message,
  className,
  overlay = false,
}: FormSuccessFlashProps) {
  return (
    <div
      className={cn(
        overlay
          ? "absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-paper-50/95 p-4 backdrop-blur-[2px]"
          : "flex min-h-[26rem] flex-col items-center justify-center px-4 py-8",
        className,
      )}
      aria-live="polite"
      role="status"
    >
      <div className="form-success-float w-full max-w-sm rounded-2xl border-2 border-gold-400/50 bg-white px-8 py-10 text-center shadow-2xl shadow-forest-900/20">
        <div
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold-400 shadow-md shadow-gold-400/40"
          aria-hidden
        >
          <span className="font-sans text-4xl font-bold leading-none text-forest-900">✓</span>
        </div>
        <p className="mt-6 font-serif text-2xl leading-tight text-crimson-400">{title}</p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">{message}</p>
      </div>
    </div>
  );
}
