import { useAuth } from '@acme/auth';
import type { Column } from '@acme/ui-kit';
import { PageLayout, StatusBadge, Table } from '@acme/ui-kit';

interface CoverageRow {
  name: string;
  limit: string;
  deductible: string;
  covered: boolean;
}

const coverages: CoverageRow[] = [
  { name: 'Dwelling', limit: '$350,000', deductible: '$1,000', covered: true },
  { name: 'Personal Property', limit: '$75,000', deductible: '$500', covered: true },
  { name: 'Liability', limit: '$100,000', deductible: '$0', covered: true },
  { name: 'Flood', limit: '—', deductible: '—', covered: false },
  { name: 'Earthquake', limit: '—', deductible: '—', covered: false },
];

const columns: Column<CoverageRow>[] = [
  { key: 'name', header: 'Coverage Type' },
  { key: 'limit', header: 'Limit' },
  { key: 'deductible', header: 'Deductible' },
  {
    key: 'covered',
    header: 'Included',
    render: (c: CoverageRow) => <StatusBadge status={c.covered ? 'Yes' : 'No'} />,
  },
];

export default function App() {
  const auth = useAuth();
  const subtitle = auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in';

  return (
    <PageLayout title="Coverage" subtitle={subtitle}>
      <Table rows={coverages} columns={columns} getRowKey={(c: CoverageRow) => c.name} />
    </PageLayout>
  );
}
