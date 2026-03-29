import React, { Suspense, lazy, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styles from './App.module.css';

const PolicyApp = lazy(() => import('policy/App'));
const ClaimsApp = lazy(() => import('claims/App'));
const CoverageApp = lazy(() => import('coverage/App'));

type Tab = 'policy' | 'claims' | 'coverage';

const TABS: Tab[] = ['policy', 'claims', 'coverage'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('policy');

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.logo}>Acme Dashboard</span>
        <nav className={styles.nav}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>
      <main className={styles.main}>
        <ErrorBoundary key={activeTab} fallback={<p className={styles.error}>Failed to load module.</p>}>
          <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
            {activeTab === 'policy' && <PolicyApp />}
            {activeTab === 'claims' && <ClaimsApp />}
            {activeTab === 'coverage' && <CoverageApp />}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
