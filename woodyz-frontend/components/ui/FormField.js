/**
 * Reusable form field with label + styled input/textarea/select.
 * Replaces 12+ identical label+input blocks across checkout, login, register,
 * admin modal, and support bubble.
 */
export default function FormField({
  label,
  id,
  type = 'text',
  className = '',
  children,    // For <select> options
  ...inputProps
}) {
  const baseClasses =
    'w-full px-6 py-4 rounded-2xl border-3 border-charcoal bg-cream font-bold';
  const combined = `${baseClasses} ${className}`;

  const renderInput = () => {
    if (type === 'textarea') {
      return <textarea id={id} className={combined} {...inputProps} />;
    }
    if (type === 'select') {
      return (
        <select id={id} className={`${combined} appearance-none`} {...inputProps}>
          {children}
        </select>
      );
    }
    return <input id={id} type={type} className={combined} {...inputProps} />;
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50"
        >
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
}
