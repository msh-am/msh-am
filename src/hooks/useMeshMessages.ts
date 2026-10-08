import { useState, useEffect, useCallback } from 'react';
import type { MeshMessage, MeshNode } from '../types/mesh';

const API_BASE_URL = 'https://api.msh.am';
const API_MESSAGES_URL = `${API_BASE_URL}/api/messages`;
const API_EVENTS_URL = `${API_BASE_URL}/api/events`;

export function useMeshMessages(knownNodes: MeshNode[] = []) {
  const [messages, setMessages] = useState<MeshMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState<string>('ALL');

  // Enrich message with node directory information if missing
  const enrichMessage = useCallback((msg: any, nodes: MeshNode[]): MeshMessage => {
    const fromId = msg.from_id || '';
    const senderNode = nodes.find(n => n.id.toLowerCase() === fromId.toLowerCase());

    const heardBy = Array.isArray(msg.heard_by) ? msg.heard_by.map((hb: any) => {
      const rxNode = nodes.find(n => n.id.toLowerCase() === (hb.node_id || '').toLowerCase());
      return {
        node_id: hb.node_id || '',
        short_name: hb.short_name || rxNode?.shortName || (hb.node_id ? hb.node_id.slice(-4).toUpperCase() : 'GW'),
        long_name: hb.long_name || rxNode?.longName || `Gateway ${hb.node_id || ''}`,
        role: hb.role || rxNode?.role || 'ROUTER',
        snr: typeof hb.snr === 'number' ? hb.snr : undefined,
        rssi: typeof hb.rssi === 'number' ? hb.rssi : undefined,
        source: hb.source || 'mqtt',
        timestamp: hb.timestamp || Date.now(),
      };
    }) : [];

    return {
      id: msg.id || `msg_${msg.timestamp || Date.now()}_${fromId}`,
      from_id: fromId,
      from_short_name: msg.from_short_name || senderNode?.shortName || (fromId.length >= 4 ? fromId.slice(-4).toUpperCase() : 'NODE'),
      from_long_name: msg.from_long_name || senderNode?.longName || `Node ${fromId}`,
      to_id: msg.to_id || '^all',
      text: msg.text || '',
      channel: String(msg.channel ?? '0'),
      hops: typeof msg.hops === 'number' ? msg.hops : 0,
      timestamp: typeof msg.timestamp === 'number' ? (msg.timestamp < 1e11 ? msg.timestamp * 1000 : msg.timestamp) : Date.now(),
      latitude: msg.latitude ?? senderNode?.latitude,
      longitude: msg.longitude ?? senderNode?.longitude,
      region: msg.region || senderNode?.region || 'Armenia',
      role: msg.role || senderNode?.role || 'CLIENT',
      heard_by: heardBy,
    };
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`${API_MESSAGES_URL}?limit=60`);
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw)) {
          const enriched = raw.map(m => enrichMessage(m, knownNodes));
          setMessages(enriched);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  }, [enrichMessage, knownNodes]);

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // SSE Stream integration for real-time messaging
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let eventSource: EventSource | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    try {
      eventSource = new EventSource(API_EVENTS_URL);

      eventSource.addEventListener('message', (event) => {
        try {
          const payload = JSON.parse(event.data);
          const enriched = enrichMessage(payload, knownNodes);

          setMessages(prev => {
            const index = prev.findIndex(m => m.id === enriched.id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = enriched;
              return updated;
            }
            return [enriched, ...prev].slice(0, 100);
          });
        } catch {
          // ignore parsing error
        }
      });

      eventSource.onerror = () => {
        // Fall back to periodic polling if SSE drops
        if (!fallbackTimer) {
          fallbackTimer = setInterval(fetchMessages, 20000);
        }
      };
    } catch {
      fallbackTimer = setInterval(fetchMessages, 25000);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (fallbackTimer) {
        clearInterval(fallbackTimer);
      }
    };
  }, [enrichMessage, fetchMessages, knownNodes]);

  const filteredMessages = messages.filter(m => {
    if (channelFilter === 'ALL') return true;
    return String(m.channel) === String(channelFilter);
  });

  return {
    messages: filteredMessages,
    allMessages: messages,
    loading,
    channelFilter,
    setChannelFilter,
    refresh: fetchMessages,
  };
}
