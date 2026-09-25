import { useState, useEffect, useCallback, useMemo } from 'react';
import type { MeshNode, MeshNetworkStats } from '../types/mesh';

// Discovered nodes on the Armenian Meshtastic mesh (33 total)
const DEFAULT_ARMENIA_NODES: MeshNode[] = [
  {
    id: '!f24762e0',
    num: 4064764640,
    shortName: 'YRPT',
    longName: 'Yundin Repeater',
    role: 'ROUTER',
    hwModel: 'RAK4631',
    batteryLevel: 97,
    voltage: 4.16,
    hopsAway: 1,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!d3f8bee5',
    num: 3556294373,
    shortName: 'him',
    longName: 'himura',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    batteryLevel: 100,
    voltage: 4.20,
    hopsAway: 1,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!bba93b84',
    num: 3148422020,
    shortName: '😺',
    longName: 'mooncat',
    role: 'CLIENT',
    hwModel: 'T_ECHO',
    batteryLevel: 100,
    voltage: 4.18,
    hopsAway: 3,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!aa494418',
    num: 2856993816,
    shortName: '3DR1',
    longName: '3D_RAK4631',
    role: 'ROUTER',
    hwModel: 'RAK4631',
    batteryLevel: 100,
    voltage: 4.21,
    hopsAway: 1,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!7c5a4fe0',
    num: 2086359008,
    shortName: 'Offo',
    longName: 'Offout',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    batteryLevel: 100,
    snr: 6.0,
    hopsAway: 0,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!6ec1f455',
    num: 1858204757,
    shortName: 'AKRZ',
    longName: 'Alex Kraiz',
    role: 'CLIENT',
    hwModel: 'T_BEAM',
    batteryLevel: 100,
    hopsAway: 3,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!438fa12a',
    num: 1133486378,
    shortName: 'tina',
    longName: 'Tina DiPierro',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    batteryLevel: 72,
    snr: 11.0,
    hopsAway: 0,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!0acb5c98',
    num: 181099672,
    shortName: 'TIV4',
    longName: 'Timur Heltec v4',
    role: 'CLIENT',
    hwModel: 'HELTEC_V4',
    batteryLevel: 100,
    snr: 3.0,
    hopsAway: 0,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!433ada54',
    num: 1127930452,
    shortName: 'LMAO',
    longName: 'Aleksei',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    batteryLevel: 100,
    hopsAway: 1,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!02ea91b4',
    num: 48927156,
    shortName: 'jwd1',
    longName: 'jwd_mt_cli1',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    batteryLevel: 81,
    hopsAway: 1,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!00fc7393',
    num: 16544659,
    shortName: 'jwd5',
    longName: 'SimpLoRa v2.1',
    role: 'CLIENT',
    hwModel: 'SimpLoRa',
    batteryLevel: 96,
    hopsAway: 4,
    lastHeard: Date.now() - 1000,
    isOnline: true,
  },
  {
    id: '!0d8802c3',
    num: 227017411,
    shortName: 'kitD',
    longName: 'kita home',
    role: 'CLIENT_BASE',
    hwModel: 'RAK4631',
    batteryLevel: 100,
    snr: 0.0,
    hopsAway: 0,
    lastHeard: Date.now() - 2000,
    isOnline: true,
  },
  {
    id: '!ad62f764',
    num: 2908944228,
    shortName: 'kitF',
    longName: 'kita backup',
    role: 'CLIENT_MUTE',
    hwModel: 'HELTEC_V3',
    snr: 11.0,
    hopsAway: 0,
    lastHeard: Date.now() - 5 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!4c059898',
    num: 1275435160,
    shortName: 'SÖL',
    longName: 'Almost Sölar node',
    role: 'ROUTER',
    hwModel: 'RAK4631',
    snr: -1.0,
    hopsAway: 0,
    lastHeard: Date.now() - 5 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!69853ea4',
    num: 1770340004,
    shortName: 'Bngl',
    longName: 'Bangladesh',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 3,
    lastHeard: Date.now() - 16 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!7c5b4a5c',
    num: 2086423132,
    shortName: 'sphr',
    longName: 'spherebread',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 19 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!81500238',
    num: 2169504312,
    shortName: 'drgn',
    longName: 'drag0n',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 20 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!0acb125c',
    num: 181080668,
    shortName: 'omv',
    longName: 'omavel',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 28 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!0f43f963',
    num: 256113007,
    shortName: 'csβ',
    longName: 'Corpus Beta',
    role: 'CLIENT',
    hwModel: 'T_BEAM',
    hopsAway: 2,
    lastHeard: Date.now() - 41 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!fab48fa5',
    num: 4206137253,
    shortName: 'DOOF',
    longName: 'Doofenshmirtz Evil Incor',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 3,
    lastHeard: Date.now() - 57 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!9028c658',
    num: 2418591320,
    shortName: 'UBRB',
    longName: 'Uber base',
    role: 'CLIENT_BASE',
    hwModel: 'RAK4631',
    hopsAway: 2,
    lastHeard: Date.now() - 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!1a6d9d7b',
    num: 443391355,
    shortName: 'SSMN',
    longName: 'Seeed Studio Mobile Node',
    role: 'CLIENT',
    hwModel: 'Seeed_T1000',
    hopsAway: 1,
    lastHeard: Date.now() - 2 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!dc96475a',
    num: 3699869530,
    shortName: '320k',
    longName: '320k-T114-1',
    role: 'CLIENT',
    hwModel: 'T114',
    hopsAway: 1,
    lastHeard: Date.now() - 2 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!561f4d61',
    num: 1444889953,
    shortName: 'kitA',
    longName: 'kita mobile',
    role: 'CLIENT',
    hwModel: 'T_ECHO',
    hopsAway: 1,
    lastHeard: Date.now() - 3 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!8fa209ec',
    num: 2409761260,
    shortName: 'odbc',
    longName: 'odbc_bdbc',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 3 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!5f615e87',
    num: 1600216711,
    shortName: 'ALEX',
    longName: 'Alex T-Echo',
    role: 'CLIENT',
    hwModel: 'T_ECHO',
    hopsAway: 1,
    lastHeard: Date.now() - 3 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!4355ec68',
    num: 1129704552,
    shortName: 'cnac',
    longName: 'Hacker Embassy hackem.cc',
    role: 'ROUTER',
    hwModel: 'RAK4631',
    hopsAway: 1,
    lastHeard: Date.now() - 4 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!3367919c',
    num: 862425500,
    shortName: 'Yndn',
    longName: 'Yundin',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 2,
    lastHeard: Date.now() - 5 * 60 * 60 * 1000,
    isOnline: true,
  },
  {
    id: '!12587e28',
    num: 307789352,
    shortName: 'zero',
    longName: 'zero_7e28',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 2,
    lastHeard: Date.now() - 10 * 60 * 60 * 1000,
    isOnline: false,
  },
  {
    id: '!0ac9d068',
    num: 180998248,
    shortName: 'EXEC',
    longName: 'EXEC',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 11 * 60 * 60 * 1000,
    isOnline: false,
  },
  {
    id: '!43562b8c',
    num: 1129720716,
    shortName: 'vita',
    longName: 'ezhevita',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    hopsAway: 1,
    lastHeard: Date.now() - 12 * 60 * 60 * 1000,
    isOnline: false,
  },
  {
    id: '!02fc52ae',
    num: 50090670,
    shortName: 'UBRP',
    longName: 'Uber MeshPocket',
    role: 'CLIENT',
    hwModel: 'T_ECHO',
    hopsAway: 1,
    lastHeard: Date.now() - 16 * 60 * 60 * 1000,
    isOnline: false,
  },
  {
    id: '!bbad1154',
    num: 3148673364,
    shortName: 'NRAU',
    longName: 'Node near RAU',
    role: 'CLIENT',
    hwModel: 'HELTEC_V3',
    snr: -4.0,
    hopsAway: 0,
    lastHeard: Date.now() - 24 * 60 * 60 * 1000,
    isOnline: false,
  },
];

export function useMeshNetwork() {
  const [nodes, setNodes] = useState<MeshNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [endpointUrl, setEndpointUrl] = useState<string>('/api/nodes');
  const [statusMode, setStatusMode] = useState<'simulated' | 'connected' | 'disconnected'>('connected');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Load custom endpoint from localStorage if set
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('msh_api_endpoint');
      if (saved) {
        setEndpointUrl(saved);
      }
    }
  }, []);

  const fetchNodes = useCallback(async (url?: string) => {
    const targetUrl = url || endpointUrl;
    if (!targetUrl) {
      setStatusMode('simulated');
      setLastUpdated(new Date());
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      const rawNodes = Array.isArray(data) ? data : data.nodes || [];
      const parsedNodes: MeshNode[] = rawNodes.map((n: any) => {
        const lastHeardMs = typeof n.lastHeard === 'number' 
          ? (n.lastHeard < 1e11 ? n.lastHeard * 1000 : n.lastHeard)
          : Date.now();
        const isOnline = Date.now() - lastHeardMs < 8 * 60 * 60 * 1000;

        return {
          id: n.id || (n.num ? `!${n.num.toString(16)}` : `!${Math.random().toString(16).slice(2, 10)}`),
          num: n.num || 0,
          shortName: n.shortName || n.user?.shortName || 'NODE',
          longName: n.longName || n.user?.longName || 'Unknown Node',
          role: n.role || n.user?.role || 'CLIENT',
          hwModel: n.hwModel || n.user?.hwModel || 'UNKNOWN',
          batteryLevel: n.deviceMetrics?.batteryLevel ?? n.batteryLevel,
          voltage: n.deviceMetrics?.voltage ?? n.voltage,
          channelUtilization: n.deviceMetrics?.channelUtilization,
          airUtilTx: n.deviceMetrics?.airUtilTx,
          snr: n.snr,
          rssi: n.rssi,
          hopsAway: n.hopsAway ?? 0,
          lastHeard: lastHeardMs,
          latitude: n.position?.latitude ?? n.latitude,
          longitude: n.position?.longitude ?? n.longitude,
          altitude: n.position?.altitude ?? n.altitude,
          region: n.region || 'Armenia',
          isOnline,
        };
      });

      setNodes(parsedNodes);
      setStatusMode('connected');
    } catch (err) {
      console.warn('Failed to fetch live mesh data from endpoint:', err);
      setStatusMode('disconnected');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, [endpointUrl]);

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
      : 92;

    const latestPacket = nodes.reduce((max, n) => Math.max(max, n.lastHeard), 0);

    return {
      totalNodes: nodes.length,
      onlineNodes: onlineList.length,
      activeRouters: routersList.length,
      avgBattery,
      channelUtilization: 2.8,
      lastPacketTime: latestPacket,
      mqttStatus: statusMode,
      endpointUrl,
    };
  }, [nodes, statusMode, endpointUrl]);

  const updateEndpoint = (url: string) => {
    setEndpointUrl(url);
    if (typeof window !== 'undefined') {
      if (url) {
        localStorage.setItem('msh_api_endpoint', url);
      } else {
        localStorage.removeItem('msh_api_endpoint');
      }
    }
    fetchNodes(url);
  };

  return {
    nodes,
    stats,
    loading,
    lastUpdated,
    endpointUrl,
    updateEndpoint,
    refresh: () => fetchNodes(),
  };
}
