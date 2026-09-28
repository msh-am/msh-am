export type NodeRole = 'CLIENT' | 'CLIENT_MUTE' | 'CLIENT_BASE' | 'ROUTER' | 'TRACKER';

export interface MeshNode {
  id: string;             // e.g. "!2e4a1b8c"
  num: number;            // numeric node ID
  shortName: string;      // e.g. "EV01"
  longName: string;       // e.g. "AM-EVN-Kentron-R01"
  role: NodeRole;
  hwModel: string;        // e.g. "HELTEC_V3", "RAK4631", "T_ECHO", "T_BEAM"
  batteryLevel?: number;  // 0 - 100 percentage
  voltage?: number;       // e.g. 4.12 V
  channelUtilization?: number; // percentage
  airUtilTx?: number;     // percentage
  snr?: number;           // dB, e.g. 9.5
  rssi?: number;          // dBm, e.g. -85
  hopsAway?: number;      // 0 = direct neighbor, 1, 2, 3
  lastHeard: number;      // epoch timestamp in milliseconds
  latitude?: number;
  longitude?: number;
  altitude?: number;
  region?: string;        // e.g. "Yerevan", "Mount Aragats", "Lake Sevan", "Dilijan"
  isOnline: boolean;      // heard within threshold (24h)
}

export interface MeshNetworkStats {
  totalNodes: number;
  onlineNodes: number;
  activeRouters: number;
  avgBattery: number;
  channelUtilization: number;
  lastPacketTime: number;
  mqttStatus: 'connected' | 'disconnected' | 'simulated';
  endpointUrl?: string;
}
