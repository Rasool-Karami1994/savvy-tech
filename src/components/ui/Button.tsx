import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center rounded-xl font-medium transition-colors " +
      " disabled:opacity-60 cursor-pointer focus:border-btn focus:ring-1 focus:ring-btn focus:shadow-elev-1";

    const childArray = React.Children.toArray(children);
    const hasLabel = childArray.some((node) => {
      if (typeof node === "string") return node.trim().length > 0;
      if (typeof node === "number") return true;
      return true;
    });
    const hasIcon = !!leftIcon || !!rightIcon;
    const iconOnly = hasIcon && !hasLabel;

    const sizes: Record<Size, string> = iconOnly
      ? {
          sm: "h-9 w-9 text-sm",
          md: "h-10 w-10 text-sm",
          lg: "h-11 w-11 text-base",
        }
      : {
          sm: "h-9 px-3 text-sm",
          md: "h-10 px-4 text-sm",
          lg: "h-11 px-5 text-base",
        };

    const variants: Record<Variant, string> = {
      primary:
        "bg-btn text-btn-foreground hover:bg-btn/90 border border-transparent",
      secondary:
        "bg-fields text-title border border-border hover:bg-secondary/60",
      outline: "bg-main text-title border border-border hover:bg-selected/40",
      ghost:
        "bg-transparent text-title border border-transparent hover:bg-selected/40",
    };


    return (
      <button
        ref={ref}
        className={cn(
          base,
          sizes[size],
          variants[variant],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {leftIcon && (
          <span className={cn(loading && "opacity-0 pointer-events-none")}>
            {leftIcon}
          </span>
        )}

        {hasLabel && (
          <span className={cn("whitespace-nowrap", loading && "opacity-0")}>
            {children}
          </span>
        )}

        {rightIcon && (
          <span className={cn(loading && "opacity-0 pointer-events-none")}>
            {rightIcon}
          </span>
        )}

        {loading && (
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="opacity-25"
              />
              <path
                d="M21 12a9 9 0 0 1-9 9"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
