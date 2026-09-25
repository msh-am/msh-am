import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Radio, 
  Battery, 
  BatteryCharging, 
  Signal, 
  MapPin, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal,
  WifiOff,
  Clock
} from 'lucide-react';
import type { MeshNode, NodeRole } from '../../types/mesh';
import styles from './styles.module.css';

interface NodeDirectoryProps {
  nodes: MeshNode[];
  onOpenSettings?: () => void;
}

export default function NodeDirectory({ nodes, onOpenSettings }: NodeDirectoryProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ONLINE' | 'ROUTER' | 'CLIENT'>('ALL');
  const [sortBy, setSortBy] = useState<'lastHeard' | 'snr' | 'battery' | 'name'>('lastHeard');

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
          node.longName.toLowerCase().includes(q) ||
          node.shortName.toLowerCase().includes(q) ||
          node.id.toLowerCase().includes(q) ||
          (node.region && node.region.toLowerCase().includes(q)) ||
          node.hwModel.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'lastHeard') return b.lastHeard - a.lastHeard;
        if (sortBy === 'snr') return (b.snr ?? -99) - (a.snr ?? -99);
        if (sortBy === 'battery') return (b.batteryLevel ?? 0) - (a.batteryLevel ?? 0);
        if (sortBy === 'name') return a.longName.localeCompare(b.longName);
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

  const getBatteryColor = (level?: number) => {
    if (level === undefined) return '#94a3b8';
    if (level > 70) return '#10b981'; // Green
    if (level > 30) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getRoleBadgeClass = (role: NodeRole) => {
    switch (role) {
      case 'ROUTER':
        return styles.roleBadgeRepeater;
      case 'CLIENT_BASE':
        return styles.roleBadgeBase;
      case 'CLIENT_MUTE':
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

            {onOpenSettings && (
              <button 
                type="button" 
                onClick={onOpenSettings}
                className={styles.settingsBtn}
                title="Configure live data endpoint"
              >
                <SlidersHorizontal size={16} />
                <span>API Endpoint</span>
              </button>
            )}
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
          {filteredNodes.map((node) => (
            <div 
              key={node.id} 
              className={`${styles.nodeCard} ${!node.isOnline ? styles.nodeCardOffline : ''}`}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleArea}>
                  <div className={styles.statusIndicator}>
                    <span 
                      className={node.isOnline ? styles.onlineIndicator : styles.offlineIndicator} 
                      title={node.isOnline ? 'Online (heard < 15m)' : 'Offline / Inactive'}
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
                    {node.batteryLevel !== undefined ? `${node.batteryLevel}%` : 'N/A'}
                    {node.voltage && <span className={styles.voltageSub}>{node.voltage.toFixed(2)}V</span>}
                  </div>
                </div>

                {/* Signal (SNR / RSSI) */}
                <div className={styles.telemetryItem} title="Signal-to-Noise Ratio & RSSI">
                  <div className={styles.telemetryLabel}>
                    <Signal size={13} />
                    <span>Signal</span>
                  </div>
                  <div className={styles.telemetryValue}>
                    {node.snr !== undefined ? `${node.snr > 0 ? '+' : ''}${node.snr.toFixed(1)} dB` : 'N/A'}
                    {node.rssi && <span className={styles.voltageSub}>{node.rssi} dBm</span>}
                  </div>
                </div>

                {/* Hops */}
                <div className={styles.telemetryItem} title="Hop Distance (0 = direct)">
                  <div className={styles.telemetryLabel}>
                    <Layers size={13} />
                    <span>Hops</span>
                  </div>
                  <div className={styles.telemetryValue}>
                    {node.hopsAway === 0 ? 'Direct (0)' : `${node.hopsAway} hop${node.hopsAway! > 1 ? 's' : ''}`}
                  </div>
                </div>

                {/* Hardware Model */}
                <div className={styles.telemetryItem} title="Hardware Device">
                  <div className={styles.telemetryLabel}>
                    <Cpu size={13} />
                    <span>Hardware</span>
                  </div>
                  <div className={styles.telemetryValue} title={node.hwModel}>
                    {node.hwModel.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.lastSeen}>
                  <Clock size={12} />
                  <span>Seen {getRelativeTime(node.lastHeard)}</span>
                </div>
                {node.latitude && node.longitude && (
                  <span className={styles.gpsTag} title={`Lat: ${node.latitude}, Lon: ${node.longitude}`}>
                    GPS Fixed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
