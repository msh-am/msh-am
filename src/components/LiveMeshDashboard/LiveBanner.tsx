import React from 'react';
import Link from '@docusaurus/Link';
import { Radio, Activity, Mountain, BatteryCharging, ArrowRight, RefreshCw } from 'lucide-react';
import { useMeshNetwork } from '../../hooks/useMeshNetwork';
import styles from './styles.module.css';

export default function LiveBanner(): React.JSX.Element {
  const { stats, loading, refresh } = useMeshNetwork();

  const getRelativeTime = (timestamp: number) => {
    const diffSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    return `${Math.floor(diffMinutes / 60)}h ago`;
  };

  return (
    <div className={styles.liveBannerContainer}>
      <div className={styles.liveBanner}>
        {/* Live Indicator */}
        <div className={styles.pulseWrapper}>
          <span className={styles.pulseDot} />
          <span className={styles.pulsePing} />
          <span className={styles.bannerBadge}>MESH LIVE</span>
        </div>

        {/* Stats Strip */}
        <div className={styles.metricsGroup}>
          <div className={styles.metricItem}>
            <Radio className={styles.metricIcon} size={16} />
            <span className={styles.metricValue}>{stats.onlineNodes}</span>
            <span className={styles.metricLabel}>Online Nodes</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.metricItem}>
            <Mountain className={styles.metricIcon} size={16} />
            <span className={styles.metricValue}>{stats.activeRouters}</span>
            <span className={styles.metricLabel}>Routers</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.metricItem}>
            <Activity className={styles.metricIcon} size={16} />
            <span className={styles.metricValue}>{stats.channelUtilization}%</span>
            <span className={styles.metricLabel}>Channel Util</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.metricItem}>
            <BatteryCharging className={styles.metricIcon} size={16} />
            <span className={styles.metricValue}>{stats.avgBattery}%</span>
            <span className={styles.metricLabel}>Avg Battery</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.metricItem}>
            <span className={styles.timeTag}>
              Last rx: {getRelativeTime(stats.lastPacketTime)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actionsGroup}>
          <button 
            type="button" 
            onClick={refresh} 
            className={styles.refreshBtn}
            title="Refresh mesh telemetry"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? styles.spinning : ''} />
          </button>
          
          <Link to="/dashboard" className={styles.dashboardLink}>
            <span>View Dashboard</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
