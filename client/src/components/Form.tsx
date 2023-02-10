import { ComponentChildren } from "preact";

export default function Form({
  children,
  className = "",
  onSubmit,
}: {
  className?: string;
  children: ComponentChildren;
  onSubmit: () => void;
}) {
  return (
    <form
      className={`grid grid-cols-[auto,1fr] items-end gap-2 ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

Form.Field = function ({
  label,
  error,
  inputProps,
}: {
  label: string;
  error: string;
  inputProps: any;
}) {
  return (
    <>
      <label className="text-right">{label}</label>
      <input
        className={`px-1 outline outline-1   ${
          error ? "outline-red-200" : "outline-slate-200 focus:outline-cyan-400"
        }`}
        {...inputProps}
      />
      <Form.Error>{error}</Form.Error>
    </>
  );
};

Form.Actions = function ({ children }: { children: ComponentChildren }) {
  return <div className="col-span-full">{children}</div>;
};

Form.Error = function ({ children }: { children: string }) {
  return <span className="col-span-full text-sm text-red-600">{children}</span>;
};
