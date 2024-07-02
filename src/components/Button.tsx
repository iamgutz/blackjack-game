import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const VARIANTS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DEFAULT: 'default',
  DANGER: 'danger',
};

type Variant = (typeof VARIANTS)[keyof typeof VARIANTS];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const buttonVariants: Record<string, string> = {
  [VARIANTS.DEFAULT]: 'from-blue-900 bg-blue-700 border-blue-600 hover:border-blue-400',
  [VARIANTS.SUCCESS]: 'from-emerald-800 bg-emerald-600 border-emerald-500 hover:border-emerald-300',
  [VARIANTS.WARNING]: 'from-amber-800 bg-amber-600 border-amber-500 hover:border-amber-300',
  [VARIANTS.DANGER]: 'from-red-800 bg-red-600 border-red-500 hover:border-red-300',
};

export default function Button({
  children,
  variant = '',
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const variantClassName = buttonVariants[variant] || buttonVariants.default;
  return (
    <button
      className={clsx([
        'flex items-center py-3 px-6 h-fit',
        'rounded-full text-2xl font-semibold bg-gradient-to-b from-20% transition-all duration-200 ease-in-out',
        'border border-transparent focus:outline-1 outline-teal-200',
        variantClassName,
        disabled &&
          'cursor-not-allowed !from-gray-700 !bg-gray-500 !border-gray-500 !hover:border-gray-500 opacity-50',
        className,
      ])}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
