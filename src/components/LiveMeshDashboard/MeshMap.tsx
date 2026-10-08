import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { MapPin } from 'lucide-react';
import type { MeshNode } from '../../types/mesh';

interface ActiveLink {
  from: [number, number];
  to: [number, number];
  fromName?: string;
  toName?: string;
}

interface MeshMapProps {
  nodes: MeshNode[];
  selectedNodeId?: string | null;
  onSelectNode?: (node: MeshNode) => void;
  activeLink?: ActiveLink | null;
}

export default function MeshMap(props: MeshMapProps): React.JSX.Element {
  return (
    <BrowserOnly
      fallback={
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          background: 'var(--msh-telemetry-bg)',
          border: '1px solid var(--msh-card-border)',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--msh-text-muted)',
          gap: '0.75rem',
        }}>
          <MapPin size={28} color="var(--ifm-color-primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Loading Armenia Mesh Map...</span>
        </div>
      }
    >
      {() => {
        const MeshMapInner = require('./MeshMapInner').default;
        return <MeshMapInner {...props} />;
      }}
    </BrowserOnly>
  );
}
