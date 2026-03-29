import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    policy: 'policy@http://localhost:3001/mf-manifest.json',
    claims: 'claims@http://localhost:3002/mf-manifest.json',
    coverage: 'coverage@http://localhost:3003/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
