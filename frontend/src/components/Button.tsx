import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-md font-medium focus:outline-none \
   focus-visible:ring-2 ring-offset-2 transition-colors disabled:opacity-60 \
   disabled:cursor-not-allowed";

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white ring-blue-500",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 ring-slate-400",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white ring-emerald-500",
  danger: "bg-red-600 hover:bg-red-700 text-white ring-red-500",
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
}
export function Button({
  size = "md",
  variant = "primary",
  className,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(base, sizes[size], variants[variant], "w-full max-w-xs mx-auto", className)}
      {...rest}
    />
  );
} 