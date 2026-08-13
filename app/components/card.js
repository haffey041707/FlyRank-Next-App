/**
 * Surface primitive. Server Component.
 * All card chrome (surface colour, border, radius) comes from design tokens,
 * so screens never restate them.
 */
export default function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`rounded-card border border-border bg-surface ${
        interactive
          ? "transition-colors hover:border-border-strong hover:bg-surface-hover"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
