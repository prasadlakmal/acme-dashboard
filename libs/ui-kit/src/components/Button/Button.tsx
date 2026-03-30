import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'secondary', className, children, ...props }: ButtonProps) {
  const cls = [styles.base, styles[variant], className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
