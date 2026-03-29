import { useAuth } from '@acme/auth';
import styles from './App.module.css';

const coverages = [
  { name: 'Dwelling', limit: '$350,000', deductible: '$1,000', covered: true },
  { name: 'Personal Property', limit: '$75,000', deductible: '$500', covered: true },
  { name: 'Liability', limit: '$100,000', deductible: '$0', covered: true },
  { name: 'Flood', limit: '—', deductible: '—', covered: false },
  { name: 'Earthquake', limit: '—', deductible: '—', covered: false },
];

export default function App() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Coverage</h2>
      <p className={styles.authStatus}>
        {auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in'}
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Coverage Type</th>
            <th>Limit</th>
            <th>Deductible</th>
            <th>Included</th>
          </tr>
        </thead>
        <tbody>
          {coverages.map((c) => (
            <tr key={c.name} className={styles.row}>
              <td>{c.name}</td>
              <td>{c.limit}</td>
              <td>{c.deductible}</td>
              <td>
                <span className={c.covered ? styles.yes : styles.no}>
                  {c.covered ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
