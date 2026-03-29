import React, { useState } from 'react';
import styles from './App.module.css';

const policies = [
  { id: 'P-001', name: 'Home Insurance', status: 'Active', premium: '$120/mo' },
  { id: 'P-002', name: 'Auto Insurance', status: 'Active', premium: '$85/mo' },
  { id: 'P-003', name: 'Life Insurance', status: 'Pending', premium: '$200/mo' },
];

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Policies</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr
              key={p.id}
              className={selected === p.id ? styles.selectedRow : styles.row}
              onClick={() => setSelected(p.id)}
            >
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <span className={p.status === 'Active' ? styles.active : styles.pending}>
                  {p.status}
                </span>
              </td>
              <td>{p.premium}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
