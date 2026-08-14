import Link from "next/link";

/**
 * Button primitive. Server Component — it renders a <button>, or a <Link> when
 * given href. Every variant is expressed in design tokens.
 */

const VARIANTS = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover border border-transparent",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-hover",
  ghost:
    "border border-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground",
  danger:
    "border border-danger/30 bg-danger-soft text-danger hover:border-danger/50",
};

const SIZES = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-control font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${
    VARIANTS[variant] ?? VARIANTS.primary
  } ${SIZES[size] ?? SIZES.md} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
