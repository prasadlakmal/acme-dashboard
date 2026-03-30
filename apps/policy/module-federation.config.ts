import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'policy',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
    '@acme/auth': { singleton: true, eager: true },
    '@acme/ui-kit': { singleton: true, eager: true },
  },
});
