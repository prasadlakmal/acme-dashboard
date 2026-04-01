import { useAuth } from '@acme/auth';
import type { Column } from '@acme/ui-kit';
import { PageLayout, StatusBadge, Table } from '@acme/ui-kit';
import { useState } from 'react';

interface Claim {
  id: string;
  policy: string;
  date: string;
  amount: string;
  status: string;
}

const claims: Claim[] = [
  {
    id: 'C-101',
    policy: 'Home Insurance',
    date: '2025-01-15',
    amount: '$4,200',
    status: 'Approved',
  },
  {
    id: 'C-102',
    policy: 'Auto Insurance',
    date: '2025-02-03',
    amount: '$1,800',
    status: 'In Review',
  },
  { id: 'C-103', policy: 'Home Insurance', date: '2025-03-10', amount: '$650', status: 'Pending' },
];

const columns: Column<Claim>[] = [
  { key: 'id', header: 'ID' },
  { key: 'policy', header: 'Policy' },
  { key: 'date', header: 'Date' },
  { key: 'amount', header: 'Amount' },
  {
    key: 'status',
    header: 'Status',
    render: (c: Claim) => <StatusBadge status={c.status} />,
  },
];

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const auth = useAuth();
  const subtitle = auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in';

  return (
    <PageLayout title="Claims" subtitle={subtitle}>
      <Table
        rows={claims}
        columns={columns}
        getRowKey={(c: Claim) => c.id}
        selectedKey={selected}
        onRowClick={(c: Claim) => setSelected(c.id)}
      />
    </PageLayout>
  );
}
