export function Field({ label, htmlFor, error, children, hint }) {
  return (
    <div>
      {label && (
        <label htmlFor={htmlFor} className="label">
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ id, label, error, className = "", ...props }) {
  return (
    <Field label={label} htmlFor={id} error={error}>
      <input
        id={id}
        className={`input ${error ? "border-red-500/50" : ""} ${className}`}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    </Field>
  );
}

export function Select({ id, label, error, options = [], placeholder, className = "", ...props }) {
  return (
    <Field label={label} htmlFor={id} error={error}>
      <select
        id={id}
        className={`input ${error ? "border-red-500/50" : ""} ${className}`}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          if (typeof opt === "string") {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          }
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </Field>
  );
}

export function Textarea({ id, label, error, className = "", ...props }) {
  return (
    <Field label={label} htmlFor={id} error={error}>
      <textarea
        id={id}
        className={`input min-h-[130px] resize-y ${error ? "border-red-500/50" : ""} ${className}`}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    </Field>
  );
}