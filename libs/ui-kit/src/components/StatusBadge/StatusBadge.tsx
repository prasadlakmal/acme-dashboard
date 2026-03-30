import styles from './StatusBadge.module.css';

export type StatusValue = 'Active' | 'Approved' | 'Pending' | 'In Review' | 'Yes' | 'No';

export interface StatusBadgeProps {
  status: StatusValue | (string & {});
  className?: string;
}

const STATUS_CLASS_MAP: Record<string, string> = {
  Active: 'active',
  Approved: 'active',
  Yes: 'active',
  Pending: 'pending',
  'In Review': 'review',
  No: 'no',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const modifier = STATUS_CLASS_MAP[status] ?? 'no';
  const cls = [styles.badge, styles[modifier], className].filter(Boolean).join(' ');
  return <span className={cls}>{status}</span>;
}
