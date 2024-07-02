import clsx from 'clsx';
import Button, { ButtonProps } from './Button';

interface IconButtonProps extends ButtonProps {}

export default function IconButton({ children, className, ...rest }: IconButtonProps) {
  return (
    <Button
      className={clsx([
        'min-w-10 min-h-10 rounded-full p-0 flex justify-center items-center',
        className,
      ])}
      {...rest}
    >
      {children}
    </Button>
  );
}
