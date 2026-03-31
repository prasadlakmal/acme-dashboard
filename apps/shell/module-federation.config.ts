import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

const POLICY_URL = process.env.POLICY_URL ?? 'http://localhost:3001';
const CLAIMS_URL = process.env.CLAIMS_URL ?? 'http://localhost:3002';
const COVERAGE_URL = process.env.COVERAGE_URL ?? 'http://localhost:3003';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    policy: `policy@${POLICY_URL}/mf-manifest.json`,
    claims: `claims@${CLAIMS_URL}/mf-manifest.json`,
    coverage: `coverage@${COVERAGE_URL}/mf-manifest.json`,
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    'react-router': { singleton: true, eager: true },
    '@acme/auth': { singleton: true, eager: true },
    '@acme/ui-kit': { singleton: true, eager: true },
  },
});
