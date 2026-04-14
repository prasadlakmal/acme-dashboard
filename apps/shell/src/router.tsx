import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './Layout';
import { lazy } from 'react';

/**
 * Central route registry for all remote MFEs.
 * To add a new remote: add an entry here, register it in module-federation.config.ts,
 * and declare its type in remote.d.ts.
 */
interface RemoteRoute {
  path: string;
  label: string;
  Component: ReturnType<typeof lazy>;
}

const remoteRoutes: RemoteRoute[] = [
  {
    path: 'policy',
    label: 'Policy',
    Component: lazy(() => import('policy/App')),
  },
  {
    path: 'claims',
    label: 'Claims',
    Component: lazy(() => import('claims/App')),
  },
  {
    path: 'coverage',
    label: 'Coverage',
    Component: lazy(() => import('coverage/App')),
  },
];


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout navItems={remoteRoutes} />,
    children: [
      { index: true, element: <Navigate to={`/${remoteRoutes[0].path}`} replace /> },
      ...remoteRoutes.map(({ path, Component }) => ({
        path: `${path}/*`,
        element: <Component />,
      })),
    ],
  },
]);
