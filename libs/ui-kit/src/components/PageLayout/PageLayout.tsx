import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

export interface PageLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageLayout({ title, subtitle, children, className }: PageLayoutProps) {
  const cls = [styles.container, className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
}
