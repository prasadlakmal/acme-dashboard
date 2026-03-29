import React, { Suspense, lazy, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { authStore, useAuth } from '@acme/auth';
import styles from './App.module.css';

const PolicyApp = lazy(() => import('policy/App'));
const ClaimsApp = lazy(() => import('claims/App'));
const CoverageApp = lazy(() => import('coverage/App'));

type Tab = 'policy' | 'claims' | 'coverage';

const TABS: Tab[] = ['policy', 'claims', 'coverage'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('policy');
  const auth = useAuth();

  const toggleAuth = () => {
    if (auth.isAuthenticated) {
      authStore.set({ user: null, isAuthenticated: false, token: null });
    } else {
      authStore.set({
        user: { name: 'Jane Doe', email: 'jane@acme.com' },
        isAuthenticated: true,
        token: 'demo-token-abc123',
      });
    }
  };

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
        <div className={styles.authBar}>
          {auth.isAuthenticated && (
            <span className={styles.userInfo}>{auth.user?.name}</span>
          )}
          <button className={styles.authBtn} onClick={toggleAuth}>
            {auth.isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
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
