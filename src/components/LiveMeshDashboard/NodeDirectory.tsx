import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Radio, 
  Battery, 
  BatteryCharging, 
  MapPin, 
  Cpu, 
  WifiOff,
  Clock,
  Antenna
} from 'lucide-react';
import type { MeshNode, NodeRole } from '../../types/mesh';
import styles from './styles.module.css';

interface NodeDirectoryProps {
  nodes: MeshNode[];
  onSelectNode?: (nodeId: string) => void;
}

export default function NodeDirectory({ nodes, onSelectNode }: NodeDirectoryProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ONLINE' | 'ROUTER' | 'CLIENT'>('ALL');
  const [sortBy, setSortBy] = useState<'lastHeard' | 'snr' | 'battery' | 'name'>('lastHeard');
  const [activeTooltipNodeId, setActiveTooltipNodeId] = useState<string | null>(null);

  const filteredNodes = useMemo(() => {
    return nodes
      .filter((node) => {
        // Filter by role or online status
        if (roleFilter === 'ONLINE' && !node.isOnline) return false;
        if (roleFilter === 'ROUTER' && node.role !== 'ROUTER') return false;
        if (roleFilter === 'CLIENT' && node.role === 'ROUTER') return false;

        // Filter by search query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          (node.longName || '').toLowerCase().includes(q) ||
          (node.shortName || '').toLowerCase().includes(q) ||
          (node.id || '').toLowerCase().includes(q) ||
          (node.region ? node.region.toLowerCase().includes(q) : false) ||
          (node.hwModel || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'lastHeard') return (b.lastHeard || 0) - (a.lastHeard || 0);
        if (sortBy === 'snr') return (b.snr ?? -99) - (a.snr ?? -99);
        if (sortBy === 'battery') return (b.batteryLevel ?? 0) - (a.batteryLevel ?? 0);
        if (sortBy === 'name') return (a.longName || '').localeCompare(b.longName || '');
        return 0;
      });
  }, [nodes, roleFilter, searchQuery, sortBy]);

  const getRelativeTime = (timestamp: number) => {
    const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getBatteryColor = (level?: number | null) => {
    if (level == null) return '#94a3b8';
    if (level > 70) return '#10b981'; // Green
    if (level > 30) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getRoleBadgeClass = (role: NodeRole) => {
    switch (role) {
      case 'ROUTER':
      case 'ROUTER_LATE':
      case 'REPEATER':
        return styles.roleBadgeRepeater;
      case 'CLIENT_BASE':
        return styles.roleBadgeBase;
      case 'CLIENT_MUTE':
      case 'CLIENT_HIDDEN':
        return styles.roleBadgeMute;
      case 'TRACKER':
        return styles.roleBadgeTracker;
      default:
        return styles.roleBadgeClient;
    }
  };

  return (
    <div className={styles.nodeDirectory}>
      {/* Search & Filter Header */}
      <div className={styles.directoryControls}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search nodes by name, ID (!xxxx), region or hardware..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className={styles.clearSearchBtn}
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterPills}>
            <button
              type="button"
              className={`${styles.filterPill} ${roleFilter === 'ALL' ? styles.filterPillActive : ''}`}
              onClick={() => setRoleFilter('ALL')}
            >
              All ({nodes.length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${roleFilter === 'ONLINE' ? styles.filterPillActive : ''}`}
              onClick={() => setRoleFilter('ONLINE')}
            >
              🟢 Online ({nodes.filter((n) => n.isOnline).length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${roleFilter === 'ROUTER' ? styles.filterPillActive : ''}`}
              onClick={() => setRoleFilter('ROUTER')}
            >
              🏔️ Routers ({nodes.filter((n) => n.role === 'ROUTER').length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${roleFilter === 'CLIENT' ? styles.filterPillActive : ''}`}
              onClick={() => setRoleFilter('CLIENT')}
            >
              📱 Clients ({nodes.filter((n) => n.role !== 'ROUTER').length})
            </button>
          </div>

          <div className={styles.sortControls}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={styles.sortSelect}
            >
              <option value="lastHeard">Sort: Last Seen</option>
              <option value="snr">Sort: Best Signal (SNR)</option>
              <option value="battery">Sort: Highest Battery</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nodes Grid */}
      {filteredNodes.length === 0 ? (
        <div className={styles.emptyState}>
          <WifiOff size={40} className={styles.emptyIcon} />
          {nodes.length === 0 ? (
            <>
              <h3>No nodes discovered yet</h3>
              <p>
                Connect your Meshtastic device to <strong>mqtt.msh.am</strong> (topic: <code>msh/AM</code>) or transmit RF packets to register the first node on the Armenian mesh.
              </p>
            </>
          ) : (
            <>
              <h3>No nodes match your filter</h3>
              <p>Try clearing your search query or switching to "All" nodes.</p>
            </>
          )}
        </div>
      ) : (
        <div className={styles.nodeGrid}>
          {filteredNodes.map((node) => {
            const receivers = (node.heardBy && node.heardBy.length > 0)
              ? node.heardBy
              : (node.lastHeardBy ? (() => {
                  const gwNode = nodes.find(n => n.id === node.lastHeardBy);
                  return [{
                    node_id: node.lastHeardBy,
                    short_name: gwNode?.shortName || node.lastHeardBy.slice(-4).toUpperCase(),
                    long_name: gwNode?.longName || `Gateway ${node.lastHeardBy}`,
                    role: gwNode?.role || 'GATEWAY',
                    snr: node.snr,
                    rssi: node.rssi,
                    source: 'mqtt',
                    timestamp: node.lastHeard,
                  }];
                })() : null);

            return (
              <div 
                key={node.id} 
                className={`${styles.nodeCard} ${!node.isOnline ? styles.nodeCardOffline : ''}`}
                style={{ zIndex: activeTooltipNodeId === node.id ? 50 : 1, position: 'relative' }}
              >
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleArea}>
                    <div className={styles.statusIndicator}>
                      <span 
                        className={node.isOnline ? styles.onlineIndicator : styles.offlineIndicator} 
                        title={node.isOnline ? 'Online (heard < 24h)' : 'Offline / Inactive'}
                      />
                      <span className={styles.nodeShortName}>{node.shortName}</span>
                    </div>
                    <h4 className={styles.nodeLongName} title={node.longName}>
                      {node.longName}
                    </h4>
                  </div>

                  <span className={`${styles.roleBadge} ${getRoleBadgeClass(node.role)}`}>
                    {node.role}
                  </span>
                </div>

                {/* Card Meta (Region & ID) */}
                <div className={styles.cardMeta}>
                  {node.region && (
                    <span className={styles.regionTag}>
                      <MapPin size={13} />
                      <span>{node.region}</span>
                      {node.altitude && <span className={styles.altitudeTag}>{node.altitude}m</span>}
                    </span>
                  )}
                  <span className={styles.idTag}>{node.id}</span>
                </div>

                {/* Telemetry Metrics */}
                <div className={styles.telemetryGrid}>
                  {/* Battery */}
                  <div className={styles.telemetryItem} title="Battery Level">
                    <div className={styles.telemetryLabel}>
                      <Battery size={13} />
                      <span>Battery</span>
                    </div>
                    <div className={styles.telemetryValue} style={{ color: getBatteryColor(node.batteryLevel) }}>
                      {node.batteryLevel != null ? `${node.batteryLevel}%` : 'N/A'}
                      {node.voltage != null && typeof node.voltage === 'number' && !isNaN(node.voltage) && (
                        <span className={styles.voltageSub}>{node.voltage.toFixed(2)}V</span>
                      )}
                    </div>
                  </div>

                  {/* Hardware Model */}
                  <div className={styles.telemetryItem} title="Hardware Device">
                    <div className={styles.telemetryLabel}>
                      <Cpu size={13} />
                      <span>Hardware</span>
                    </div>
                    <div className={styles.telemetryValue} title={node.hwModel || 'UNKNOWN'}>
                      {(node.hwModel || 'UNKNOWN').replace('_', ' ')}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter} style={{ position: 'relative' }}>
                  <div className={styles.lastSeen} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <Clock size={12} />
                    <span>Seen {getRelativeTime(node.lastHeard)}</span>

                    {/* by (1) badge with hover popover */}
                    {receivers && receivers.length > 0 && (
                      <div
                        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                        onMouseEnter={() => setActiveTooltipNodeId(node.id)}
                        onMouseLeave={() => setActiveTooltipNodeId(null)}
                      >
                      <button
                        type="button"
                        style={{
                          background: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: 4,
                          padding: '0.08rem 0.35rem',
                          color: 'var(--ifm-color-primary)',
                          fontSize: '0.70rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          lineHeight: 1.2,
                        }}
                        title="View gateways and listeners that heard this node"
                      >
                        <Antenna size={10} />
                        <span>by ({receivers.length})</span>
                      </button>

                      {/* Popover on Hover */}
                      {activeTooltipNodeId === node.id && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: 0,
                            marginBottom: 8,
                            width: 280,
                            background: 'var(--msh-card-bg)',
                            border: '1px solid var(--msh-card-border)',
                            borderRadius: 8,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                            padding: '0.65rem 0.75rem',
                            zIndex: 100,
                            fontSize: '0.75rem',
                            color: 'var(--msh-text-primary)',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            marginBottom: '0.45rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: 'var(--ifm-color-primary)',
                            borderBottom: '1px solid var(--msh-card-border)',
                            paddingBottom: '0.3rem',
                          }}>
                            <Antenna size={13} />
                            <span>Heard & Committed by ({receivers.length})</span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: 200, overflowY: 'auto' }}>
                            {receivers.map((r, idx) => (
                              <div
                                key={`${r.node_id}-${idx}`}
                                style={{
                                  background: 'var(--msh-telemetry-bg)',
                                  borderRadius: 6,
                                  padding: '0.45rem 0.55rem',
                                  border: '1px solid var(--msh-card-border)',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--msh-text-primary)' }}>
                                      {r.short_name || r.node_id}
                                    </span>
                                    <span style={{
                                      fontSize: '0.65rem',
                                      padding: '0.05rem 0.3rem',
                                      borderRadius: 3,
                                      background: 'rgba(168, 85, 247, 0.12)',
                                      color: '#c084fc',
                                      border: '1px solid rgba(168, 85, 247, 0.25)',
                                      fontWeight: 600,
                                    }}>
                                      {r.role || 'GATEWAY'}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: '0.68rem', color: 'var(--msh-text-muted)' }}>
                                    {r.node_id}
                                  </span>
                                </div>

                                {r.long_name && (
                                  <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-secondary)', marginBottom: '0.25rem' }}>
                                    {r.long_name}
                                  </div>
                                )}

                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontSize: '0.68rem',
                                  color: 'var(--msh-text-muted)',
                                  paddingTop: '0.25rem',
                                  borderTop: '1px dashed var(--msh-card-border)',
                                }}>
                                  <span>via {r.source === 'potatomesh' ? 'PotatoMesh Ingest' : 'MQTT Gateway'}</span>
                                  {(r.snr !== undefined || r.rssi !== undefined) && (
                                    <span style={{ color: 'var(--ifm-color-primary)', fontWeight: 600 }}>
                                      {r.snr !== undefined ? `SNR: ${r.snr > 0 ? '+' : ''}${r.snr}dB` : ''}
                                      {r.snr !== undefined && r.rssi !== undefined ? ' · ' : ''}
                                      {r.rssi !== undefined ? `${r.rssi}dBm` : ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                  {node.latitude && node.longitude ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectNode) {
                          onSelectNode(node.id);
                          const mapElem = document.getElementById('armenia-mesh-map');
                          if (mapElem) {
                            mapElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }
                      }}
                      style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: 'var(--ifm-color-primary)',
                        borderRadius: 4,
                        padding: '0.15rem 0.5rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      title="Focus and center on Armenia map"
                    >
                      <MapPin size={11} />
                      <span>Show on map</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)' }}>
                      No GPS
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
