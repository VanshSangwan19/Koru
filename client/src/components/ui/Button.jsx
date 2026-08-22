import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  loading = false,
  className = "",
  disabled,
  type,
  ...props
}) {
  const classes = `${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-disabled={isDisabled} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={isDisabled} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type || "button"} className={classes} disabled={isDisabled} {...props}>
      {content}
    </button>
  );
}