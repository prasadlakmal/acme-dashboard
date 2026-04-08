import { useAuth } from '@acme/auth';
import type { Column } from '@acme/ui-kit';
import { Button, PageLayout, StatusBadge, Table } from '@acme/ui-kit';
import { Route, Routes, useNavigate, useParams } from 'react-router';

interface Claim {
  id: string;
  policy: string;
  date: string;
  amount: string;
  status: string;
  description: string;
}

const claims: Claim[] = [
  {
    id: 'C-101',
    policy: 'Home Insurance',
    date: '2025-01-15',
    amount: '$4,200',
    status: 'Approved',
    description: 'Water damage to kitchen ceiling and flooring following a burst pipe.',
  },
  {
    id: 'C-102',
    policy: 'Auto Insurance',
    date: '2025-02-03',
    amount: '$1,800',
    status: 'In Review',
    description: 'Front-end collision at intersection. Third-party liability pending review.',
  },
  {
    id: 'C-103',
    policy: 'Home Insurance',
    date: '2025-03-10',
    amount: '$650',
    status: 'Pending',
    description: 'Broken window pane in living room due to storm damage.',
  },
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

function ClaimsList() {
  const auth = useAuth();
  const navigate = useNavigate();
  const subtitle = auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in';

  return (
    <PageLayout title="Claims" subtitle={subtitle}>
      <Table
        rows={claims}
        columns={columns}
        getRowKey={(c: Claim) => c.id}
        onRowClick={(c: Claim) => navigate(c.id)}
      />
    </PageLayout>
  );
}

function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useAuth();
  const claim = claims.find((c) => c.id === id);
  const subtitle = auth.isAuthenticated ? `Signed in as ${auth.user?.name}` : 'Not signed in';

  if (!claim) {
    return (
      <PageLayout title="Claim Not Found" subtitle={subtitle}>
        <Button variant="ghost" onClick={() => navigate('/claims')}>← Back to Claims</Button>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`Claim ${claim.id}`} subtitle={subtitle}>
      <Button variant="ghost" onClick={() => navigate('/claims')}>← Back to Claims</Button>
      <dl style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '0.5rem 2rem' }}>
        <dt>Policy</dt><dd>{claim.policy}</dd>
        <dt>Date</dt><dd>{claim.date}</dd>
        <dt>Amount</dt><dd>{claim.amount}</dd>
        <dt>Status</dt><dd><StatusBadge status={claim.status} /></dd>
        <dt>Description</dt><dd>{claim.description}</dd>
      </dl>
    </PageLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<ClaimsList />} />
      <Route path=":id" element={<ClaimDetail />} />
    </Routes>
  );
}
