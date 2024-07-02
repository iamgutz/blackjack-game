import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={clsx([
        'border-amber-300 border-2 rounded-md px-2 py-1 text-2xl md:text-4xl font-semibold bg-blue-950',
        className,
      ])}
      {...rest}
    />
  );
}
