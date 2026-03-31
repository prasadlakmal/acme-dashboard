import { authStore, useAuth } from '@acme/auth';
import { Button } from '@acme/ui-kit';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NavLink, Outlet } from 'react-router';
import styles from './App.module.css';

interface NavItem {
  path: string;
  label: string;
}

export function Layout({ navItems }: { navItems: NavItem[] }) {
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
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.authBar}>
          {auth.isAuthenticated && <span className={styles.userInfo}>{auth.user?.name}</span>}
          <Button variant="secondary" onClick={toggleAuth}>
            {auth.isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <ErrorBoundary fallback={<p className={styles.error}>Failed to load module.</p>}>
          <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
