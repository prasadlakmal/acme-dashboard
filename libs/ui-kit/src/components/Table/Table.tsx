import type { ReactNode } from 'react';
import styles from './Table.module.css';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T extends object> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  selectedKey?: string | null;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends object>({
  columns,
  rows,
  getRowKey,
  selectedKey,
  onRowClick,
  className,
}: TableProps<T>) {
  return (
    <table className={[styles.table, className].filter(Boolean).join(' ')}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const key = getRowKey(row);
          const isSelected = selectedKey === key;
          return (
            <tr
              key={key}
              className={isSelected ? styles.selectedRow : styles.row}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
