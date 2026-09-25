import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import LiveMeshDashboard from '@site/src/components/LiveMeshDashboard';

export default function DashboardPage(): ReactNode {
  return (
    <Layout
      title="Live Mesh Dashboard"
      description="Real-time monitoring, online nodes, and telemetry for the Meshtastic Armenia Community network (msh.am)"
    >
      <main style={{ minHeight: '80vh', padding: '1rem 0 3rem 0' }}>
        <LiveMeshDashboard />
      </main>
    </Layout>
  );
}
