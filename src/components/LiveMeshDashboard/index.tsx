import React, { useState } from 'react';
import { 
  Radio, 
  Activity, 
  BatteryCharging, 
  RefreshCw,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useMeshNetwork } from '../../hooks/useMeshNetwork';
import { useMeshMessages } from '../../hooks/useMeshMessages';
import MeshMap from './MeshMap';
import MessagesFeed from './MessagesFeed';
import NodeDirectory from './NodeDirectory';
import styles from './styles.module.css';

export default function LiveMeshDashboard(): React.JSX.Element {
  const { 
    nodes, 
    stats, 
    loading, 
    lastUpdated, 
    refresh 
  } = useMeshNetwork();

  const {
    messages,
    loading: messagesLoading,
    refresh: refreshMessages,
  } = useMeshMessages(nodes);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<{
    from: [number, number];
    to: [number, number];
    fromName?: string;
    toName?: string;
  } | null>(null);

  const [isMapCollapsed, setIsMapCollapsed] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);

  const handleRefreshAll = () => {
    refresh();
    refreshMessages();
  };

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top Hero Overview Card */}
      <div style={{
        background: 'var(--msh-card-bg)',
        border: '1px solid var(--msh-card-border)',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--msh-card-shadow)',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={styles.pulseDot} />
              <span style={{ 
                color: 'var(--ifm-color-primary)', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Armenian Mesh Network Monitor
              </span>
              <span style={{
                fontSize: '0.72rem',
                color: stats.mqttStatus === 'connected' ? 'var(--msh-badge-text)' : '#d97706',
                background: stats.mqttStatus === 'connected' ? 'var(--msh-badge-bg)' : 'rgba(245, 158, 11, 0.1)',
                padding: '0.1rem 0.45rem',
                borderRadius: 4,
                border: `1px solid ${stats.mqttStatus === 'connected' ? 'var(--msh-badge-border)' : 'rgba(245, 158, 11, 0.25)'}`
              }}>
                {stats.mqttStatus === 'connected' ? 'LIVE MQTT/API' : 'COMMUNITY FEED'}
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--msh-text-primary)', fontWeight: 800 }}>
              Meshtastic Armenia Live Dashboard
            </h1>
            <p style={{ margin: '0.3rem 0 0 0', color: 'var(--msh-text-secondary)', fontSize: '0.925rem' }}>
              Real-time telemetry, active node directory, repeater monitoring, and live messaging across Armenia.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleRefreshAll}
              disabled={loading || messagesLoading}
              className={styles.settingsBtn}
            >
              <RefreshCw size={14} className={(loading || messagesLoading) ? styles.spinning : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
        }}>
          {/* Online Nodes */}
          <div style={{
            background: 'var(--msh-telemetry-bg)',
            border: '1px solid var(--msh-telemetry-border)',
            borderRadius: 8,
            padding: '0.85rem 1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--msh-text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <span>ACTIVE NODES</span>
              <Radio size={15} color="var(--ifm-color-primary)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--msh-text-primary)' }}>
              {stats.onlineNodes} <span style={{ fontSize: '0.85rem', color: 'var(--msh-text-muted)', fontWeight: 500 }}>/ {stats.totalNodes} total</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ifm-color-primary)', marginTop: '0.15rem' }}>
              Heard in last 24 hours
            </div>
          </div>


          {/* Channel Utilization */}
          <div style={{
            background: 'var(--msh-telemetry-bg)',
            border: '1px solid var(--msh-telemetry-border)',
            borderRadius: 8,
            padding: '0.85rem 1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--msh-text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <span>SPECTRUM LOAD</span>
              <Activity size={15} color="#0284c7" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--msh-text-primary)' }}>
              {stats.channelUtilization}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-secondary)', marginTop: '0.15rem' }}>
              EU_868 MediumFast (Slot 0)
            </div>
          </div>

          {/* Battery Health */}
          <div style={{
            background: 'var(--msh-telemetry-bg)',
            border: '1px solid var(--msh-telemetry-border)',
            borderRadius: 8,
            padding: '0.85rem 1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--msh-text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <span>AVG BATTERY</span>
              <BatteryCharging size={15} color="var(--ifm-color-primary)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--msh-text-primary)' }}>
              {stats.avgBattery}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ifm-color-primary)', marginTop: '0.15rem' }}>
              Healthy battery levels
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Armenia Coverage Map + Live Messages Feed Split */}
      <div style={{
        display: isMapCollapsed || isChatCollapsed ? 'flex' : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
        alignItems: 'stretch',
      }}>
        {/* Left Column: Interactive Armenia Coverage Map */}
        <div
          id="armenia-mesh-map"
          style={{
            background: 'var(--msh-card-bg)',
            border: '1px solid var(--msh-card-border)',
            borderRadius: 12,
            padding: isMapCollapsed ? '0.85rem 1rem' : '1.1rem',
            boxShadow: 'var(--msh-card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: isMapCollapsed ? 'auto' : '480px',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMapCollapsed ? 0 : '0.85rem',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="var(--ifm-color-primary)" />
              <h2 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--msh-text-primary)', fontWeight: 700 }}>
                Armenia Mesh Coverage Map
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsMapCollapsed(prev => !prev)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--msh-text-secondary)',
                cursor: 'pointer',
                padding: '0.3rem',
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
              title={isMapCollapsed ? "Expand map" : "Collapse map"}
              aria-label={isMapCollapsed ? "Expand map" : "Collapse map"}
            >
              {isMapCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>

          {!isMapCollapsed && (
            <div style={{ flex: 1, minHeight: '420px', position: 'relative' }}>
              <MeshMap
                nodes={nodes}
                selectedNodeId={selectedNodeId}
                onSelectNode={(node) => setSelectedNodeId(node.id)}
                activeLink={activeLink}
              />
            </div>
          )}
        </div>

        {/* Right Column: Messages Feed */}
        <div style={{ minHeight: isChatCollapsed ? 'auto' : '480px' }}>
          <MessagesFeed
            messages={messages}
            loading={messagesLoading}
            onLocateNode={(nodeId) => setSelectedNodeId(nodeId)}
            onHoverHeardBy={setActiveLink}
            nodes={nodes}
            isCollapsed={isChatCollapsed}
            onToggleCollapse={() => setIsChatCollapsed(prev => !prev)}
          />
        </div>
      </div>

      {/* Node Directory Section */}
      <div style={{ marginBottom: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--msh-text-primary)' }}>
          Active Nodes Directory
        </h2>
        <span style={{ fontSize: '0.78rem', color: 'var(--msh-text-muted)' }}>
          Updated at {lastUpdated.toLocaleTimeString()}
        </span>
      </div>

      <NodeDirectory 
        nodes={nodes} 
        onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
      />
    </div>
  );
}

