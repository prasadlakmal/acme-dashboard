import React, { useState } from 'react';
import styles from './App.module.css';

const claims = [
  { id: 'C-101', policy: 'Home Insurance', date: '2025-01-15', amount: '$4,200', status: 'Approved' },
  { id: 'C-102', policy: 'Auto Insurance', date: '2025-02-03', amount: '$1,800', status: 'In Review' },
  { id: 'C-103', policy: 'Home Insurance', date: '2025-03-10', amount: '$650', status: 'Pending' },
];

const statusClass: Record<string, string> = {
  Approved: 'approved',
  'In Review': 'inReview',
  Pending: 'pending',
};

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Claims</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => (
            <tr
              key={c.id}
              className={selected === c.id ? styles.selectedRow : styles.row}
              onClick={() => setSelected(c.id)}
            >
              <td>{c.id}</td>
              <td>{c.policy}</td>
              <td>{c.date}</td>
              <td>{c.amount}</td>
              <td>
                <span className={styles[statusClass[c.status]]}>{c.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
