import { useState, useEffect, useCallback, useMemo } from 'react';
import type { MeshNode, MeshNetworkStats } from '../types/mesh';

const ONLINE_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 24 hours
const RETENTION_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000; // 1 week (7 days)

const API_BASE_URL = 'https://api.msh.am';
const API_NODES_URL = `${API_BASE_URL}/api/nodes`;
const API_STATS_URL = `${API_BASE_URL}/api/stats`;

export function useMeshNetwork() {
  const [nodes, setNodes] = useState<MeshNode[]>([]);
  const [serverStats, setServerStats] = useState<MeshNetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMode, setStatusMode] = useState<'connected' | 'disconnected' | 'simulated'>('connected');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [nodesResult, statsResult] = await Promise.allSettled([
        fetch(API_NODES_URL),
        fetch(API_STATS_URL),
      ]);

      let hasLiveNodes = false;

      // 1. Process Nodes
      if (nodesResult.status === 'fulfilled' && nodesResult.value.ok) {
        try {
          const data = await nodesResult.value.json();
          const rawNodes = Array.isArray(data) ? data : data.nodes || [];
          if (rawNodes.length > 0) {
            const now = Date.now();
            const parsedNodes: MeshNode[] = rawNodes
              .map((n: any) => {
                const lastHeardMs = typeof n.lastHeard === 'number'
                  ? (n.lastHeard < 1e11 ? n.lastHeard * 1000 : n.lastHeard)
                  : now;
                const isOnline = (now - lastHeardMs) <= ONLINE_THRESHOLD_MS;

                return {
                  id: n.id || (n.num ? `!${n.num.toString(16)}` : `!${Math.random().toString(16).slice(2, 10)}`),
                  num: n.num || 0,
                  shortName: n.shortName || n.user?.shortName || 'NODE',
                  longName: n.longName || n.user?.longName || 'Unknown Node',
                  role: n.role || n.user?.role || 'CLIENT',
                  hwModel: n.hwModel || n.user?.hwModel || 'UNKNOWN',
                  batteryLevel: n.batteryLevel ?? n.deviceMetrics?.batteryLevel,
                  voltage: n.voltage ?? n.deviceMetrics?.voltage,
                  channelUtilization: n.channelUtilization ?? n.deviceMetrics?.channelUtilization,
                  airUtilTx: n.airUtilTx ?? n.deviceMetrics?.airUtilTx,
                  snr: n.snr,
                  rssi: n.rssi,
                  hopsAway: n.hopsAway ?? 0,
                  lastHeard: lastHeardMs,
                  latitude: n.latitude ?? n.position?.latitude,
                  longitude: n.longitude ?? n.position?.longitude,
                  altitude: n.altitude ?? n.position?.altitude,
                  region: n.region || 'Armenia',
                  isOnline,
                  lastHeardBy: n.lastHeardBy ?? n.rx_by ?? n.gateway_id ?? (n.hopsAway === 0 ? '!4355ec68' : undefined),
                  heardBy: n.heardBy ?? (n.heard_by || undefined),
                };
              })
              // Auto-remove nodes not heard in last week from Total
              .filter((n: MeshNode) => (now - n.lastHeard) <= RETENTION_THRESHOLD_MS);

            setNodes(parsedNodes);
            hasLiveNodes = parsedNodes.length > 0;
          } else {
            setNodes([]);
          }
        } catch {
          setNodes([]);
        }
      } else {
        setNodes([]);
      }

      // 2. Process Stats
      if (statsResult.status === 'fulfilled' && statsResult.value.ok) {
        try {
          const statsData: MeshNetworkStats = await statsResult.value.json();
          setServerStats(statsData);
          setStatusMode(statsData.mqttStatus || (hasLiveNodes ? 'connected' : 'connected'));
        } catch {
          setStatusMode(hasLiveNodes ? 'connected' : 'disconnected');
        }
      } else {
        setStatusMode(hasLiveNodes ? 'connected' : 'disconnected');
      }
    } catch (err) {
      console.warn('Failed to fetch live mesh data from api.msh.am:', err);
      setNodes([]);
      setStatusMode('disconnected');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  // Fetch immediately on mount and periodically every 30 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Periodic relative time update
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const stats: MeshNetworkStats = useMemo(() => {
    const onlineList = nodes.filter((n) => n.isOnline);
    const routersList = nodes.filter((n) => n.role === 'ROUTER' && n.isOnline);
    const validBatteries = nodes.filter((n) => typeof n.batteryLevel === 'number').map((n) => n.batteryLevel!);
    const avgBattery = validBatteries.length
      ? Math.round(validBatteries.reduce((a, b) => a + b, 0) / validBatteries.length)
      : (serverStats?.avgBattery ?? 0);

    const validChUtil = nodes
      .filter((n) => n.isOnline && typeof n.channelUtilization === 'number')
      .map((n) => n.channelUtilization!);
    const avgChUtil = validChUtil.length
      ? Math.round((validChUtil.reduce((a, b) => a + b, 0) / validChUtil.length) * 10) / 10
      : (serverStats?.channelUtilization ?? 0);

    const latestPacket = nodes.reduce((max, n) => Math.max(max, n.lastHeard), 0);

    return {
      totalNodes: nodes.length,
      onlineNodes: onlineList.length,
      activeRouters: (nodes.length > 0 ? routersList.length : serverStats?.activeRouters) ?? 0,
      avgBattery: serverStats?.avgBattery ?? avgBattery,
      channelUtilization: serverStats?.channelUtilization ?? avgChUtil,
      lastPacketTime: serverStats?.lastPacketTime ?? (latestPacket || Date.now()),
      mqttStatus: statusMode,
      endpointUrl: API_BASE_URL,
    };
  }, [nodes, serverStats, statusMode]);

  return {
    nodes,
    stats,
    loading,
    lastUpdated,
    endpointUrl: API_BASE_URL,
    refresh: fetchData,
  };
}
