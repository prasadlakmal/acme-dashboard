import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    policy: 'policy@http://localhost:3001/mf-manifest.json',
    claims: 'claims@http://localhost:3002/mf-manifest.json',
    coverage: 'coverage@http://localhost:3003/mf-manifest.json',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    '@acme/auth': { singleton: true, eager: true },
  },
});
