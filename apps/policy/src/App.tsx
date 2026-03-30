import { useAuth } from '@acme/auth';
import type { Column } from '@acme/ui-kit';
import { PageLayout, StatusBadge, Table } from '@acme/ui-kit';
import { useState } from 'react';

interface Policy {
  id: string;
  name: string;
  status: string;
  premium: string;
}

const policies: Policy[] = [
  { id: 'P-001', name: 'Home Insurance', status: 'Active', premium: '$120/mo' },
  { id: 'P-002', name: 'Auto Insurance', status: 'Active', premium: '$85/mo' },
  { id: 'P-003', name: 'Life Insurance', status: 'Pending', premium: '$200/mo' },
];

const columns: Column<Policy>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (p: Policy) => <StatusBadge status={p.status} />,
  },
  { key: 'premium', header: 'Premium' },
];

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const auth = useAuth();
  const subtitle = auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in';

  return (
    <PageLayout title="Policies" subtitle={subtitle}>
      <Table
        rows={policies}
        columns={columns}
        getRowKey={(p: Policy) => p.id}
        selectedKey={selected}
        onRowClick={(p: Policy) => setSelected(p.id)}
      />
    </PageLayout>
  );
}
