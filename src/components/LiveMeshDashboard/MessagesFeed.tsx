import React, { useState } from 'react';
import { 
  Radio, 
  MessageSquare, 
  MapPin, 
  Antenna, 
  Layers, 
  Signal, 
  Wifi, 
  Clock,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { MeshMessage, MeshNode, HeardByInfo } from '../../types/mesh';
import styles from './styles.module.css';

interface MessagesFeedProps {
  messages: MeshMessage[];
  loading: boolean;
  channelFilter?: string;
  onChannelChange?: (channel: string) => void;
  onLocateNode?: (nodeId: string) => void;
  onHoverHeardBy?: (link: { from: [number, number]; to: [number, number]; fromName?: string; toName?: string } | null) => void;
  nodes: MeshNode[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function MessagesFeed({
  messages,
  loading,
  onLocateNode,
  onHoverHeardBy,
  nodes,
  isCollapsed = false,
  onToggleCollapse,
}: MessagesFeedProps): React.JSX.Element {
  const [activeTooltipMsgId, setActiveTooltipMsgId] = useState<string | null>(null);

  const getRelativeTime = (timestamp: number) => {
    const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleMouseEnterHeardBy = (msg: MeshMessage, hb: HeardByInfo) => {
    if (!onHoverHeardBy) return;
    const senderNode = nodes.find(n => n.id === msg.from_id);
    const rxNode = nodes.find(n => n.id === hb.node_id);

    const fromLat = msg.latitude ?? senderNode?.latitude;
    const fromLon = msg.longitude ?? senderNode?.longitude;
    const toLat = rxNode?.latitude;
    const toLon = rxNode?.longitude;

    if (typeof fromLat === 'number' && typeof fromLon === 'number' && typeof toLat === 'number' && typeof toLon === 'number') {
      onHoverHeardBy({
        from: [fromLat, fromLon],
        to: [toLat, toLon],
        fromName: msg.from_short_name,
        toName: hb.short_name,
      });
    }
  };

  const handleMouseLeaveHeardBy = () => {
    if (onHoverHeardBy) {
      onHoverHeardBy(null);
    }
  };

  return (
    <div style={{
      background: 'var(--msh-card-bg)',
      border: '1px solid var(--msh-card-border)',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      height: isCollapsed ? 'auto' : '100%',
      minHeight: isCollapsed ? 'auto' : '440px',
      maxHeight: isCollapsed ? 'none' : '560px',
      boxShadow: 'var(--msh-card-shadow)',
      position: 'relative',
      transition: 'all 0.2s ease',
    }}>
      {/* Header with Title */}
      <div style={{
        padding: '0.85rem 1rem',
        borderBottom: isCollapsed ? 'none' : '1px solid var(--msh-card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <MessageSquare size={17} color="var(--ifm-color-primary)" />
          <strong style={{ fontSize: '0.95rem', color: 'var(--msh-text-primary)' }}>
            Live Messages Feed
          </strong>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.1rem 0.4rem',
            borderRadius: 4,
            background: 'var(--msh-badge-bg)',
            color: 'var(--msh-badge-text)',
            fontWeight: 700,
          }}>
            {messages.length}
          </span>
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
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
            title={isCollapsed ? 'Expand messages' : 'Collapse messages'}
            aria-label={isCollapsed ? 'Expand messages' : 'Collapse messages'}
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        )}
      </div>

      {/* Messages List Area */}
      {!isCollapsed && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem 0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
      }}>
        {loading && messages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            color: 'var(--msh-text-muted)',
            fontSize: '0.85rem',
          }}>
            Loading live message feed...
          </div>
        ) : messages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'var(--msh-text-muted)',
            fontSize: '0.85rem',
          }}>
            <Wifi size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <div>No public broadcast messages recorded yet.</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Messages transmitted on Channel 0 will appear here in real time.
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const primaryReceiver = (msg.heard_by && msg.heard_by.length > 0)
              ? (msg.heard_by[0].short_name || msg.heard_by[0].node_id)
              : null;
            const extraReceiversCount = (msg.heard_by && msg.heard_by.length > 1) ? msg.heard_by.length - 1 : 0;
            const heardLabel = primaryReceiver
              ? `heard by ${primaryReceiver}${extraReceiversCount > 0 ? ` (+${extraReceiversCount})` : ''}`
              : null;
            const hasLocation = Boolean(msg.latitude && msg.longitude);

            return (
              <div
                key={msg.id}
                style={{
                  background: 'var(--msh-telemetry-bg)',
                  border: '1px solid var(--msh-card-border)',
                  borderRadius: 8,
                  padding: '0.65rem 0.75rem',
                  fontSize: '0.84rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  transition: 'border-color 0.15s ease',
                  position: 'relative',
                }}
              >
                {/* Message Header: Sender + Role + Time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      fontWeight: 800,
                      color: msg.role === 'ROUTER' ? '#a855f7' : 'var(--ifm-color-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}>
                      {msg.from_short_name || 'NODE'}
                    </span>

                    {msg.role && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.05rem 0.35rem',
                        borderRadius: 3,
                        background: msg.role === 'ROUTER' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                        color: msg.role === 'ROUTER' ? '#c084fc' : '#10b981',
                        border: `1px solid ${msg.role === 'ROUTER' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
                      }}>
                        {msg.role}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.72rem', color: 'var(--msh-text-muted)' }}>
                    <Clock size={11} />
                    <span>{getRelativeTime(msg.timestamp)}</span>
                  </div>
                </div>

                {/* Message Text Content */}
                <div style={{
                  color: 'var(--msh-text-primary)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                  padding: '0.15rem 0',
                }}>
                  {msg.text}
                </div>

                {/* Message Footer: "heard by [node]" badge + "Locate" button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  paddingTop: '0.25rem',
                  borderTop: '1px dashed var(--msh-card-border)',
                  position: 'relative',
                }}>
                  {/* Heard by [node] Interactive Trigger */}
                  {heardLabel ? (
                    <div
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setActiveTooltipMsgId(msg.id)}
                      onMouseLeave={() => {
                        setActiveTooltipMsgId(null);
                        handleMouseLeaveHeardBy();
                      }}
                    >
                    <button
                      type="button"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: 4,
                        padding: '0.15rem 0.45rem',
                        color: 'var(--ifm-color-primary)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Antenna size={12} />
                      <span>{heardLabel}</span>
                    </button>

                    {/* Popover Tooltip on Hover */}
                    {activeTooltipMsgId === msg.id && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: 0,
                          marginBottom: 6,
                          width: 290,
                          background: 'var(--msh-card-bg)',
                          border: '1px solid var(--msh-card-border)',
                          borderRadius: 8,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                          padding: '0.65rem 0.75rem',
                          zIndex: 50,
                          fontSize: '0.75rem',
                          color: 'var(--msh-text-primary)',
                        }}
                      >
                        <div style={{
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          marginBottom: '0.45rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--msh-card-border)',
                          paddingBottom: '0.35rem',
                        }}>
                          <span>Committed to feed by {primaryReceiver}</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--msh-text-muted)' }}>
                            Mesh Ingest
                          </span>
                        </div>

                        {msg.heard_by && msg.heard_by.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {msg.heard_by.map((hb, idx) => (
                              <div
                                key={idx}
                                onMouseEnter={() => handleMouseEnterHeardBy(msg, hb)}
                                style={{
                                  background: 'var(--msh-telemetry-bg)',
                                  border: '1px solid var(--msh-card-border)',
                                  borderRadius: 5,
                                  padding: '0.35rem 0.45rem',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  if (onLocateNode && hb.node_id) onLocateNode(hb.node_id);
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <strong style={{ color: 'var(--ifm-color-primary)', fontFamily: 'monospace' }}>
                                    {hb.short_name || hb.node_id}
                                  </strong>
                                  <span style={{
                                    fontSize: '0.65rem',
                                    color: hb.source === 'mqtt' ? '#0284c7' : '#10b981',
                                    background: hb.source === 'mqtt' ? 'rgba(2, 132, 199, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                    padding: '0.05rem 0.3rem',
                                    borderRadius: 3,
                                  }}>
                                    via {hb.source === 'mqtt' ? 'MQTT Gateway' : 'PotatoMesh'}
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--msh-text-secondary)', marginTop: '0.15rem' }}>
                                  {hb.long_name || `Node ${hb.node_id}`}
                                </div>
                                {(hb.snr != null || hb.rssi != null) && (
                                  <div style={{ fontSize: '0.68rem', color: 'var(--msh-text-muted)', marginTop: '0.2rem', display: 'flex', gap: '0.5rem' }}>
                                    {hb.snr != null && <span>SNR: <b style={{ color: 'var(--msh-text-primary)' }}>{hb.snr} dB</b></span>}
                                    {hb.rssi != null && <span>RSSI: <b style={{ color: 'var(--msh-text-primary)' }}>{hb.rssi} dBm</b></span>}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              const gw = nodes.find(n => n.id === '!4355ec68' || n.shortName === 'cnac');
                              if (onLocateNode && gw) onLocateNode(gw.id);
                            }}
                            style={{
                              background: 'var(--msh-telemetry-bg)',
                              border: '1px solid var(--msh-card-border)',
                              borderRadius: 5,
                              padding: '0.45rem 0.55rem',
                              cursor: 'pointer',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <strong style={{ color: 'var(--ifm-color-primary)', fontFamily: 'monospace' }}>
                                cnac
                              </strong>
                              <span style={{
                                fontSize: '0.65rem',
                                color: '#0284c7',
                                background: 'rgba(2, 132, 199, 0.1)',
                                padding: '0.05rem 0.35rem',
                                borderRadius: 3,
                              }}>
                                via MQTT Gateway
                              </span>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-secondary)', marginTop: '0.15rem' }}>
                              hackem.cc msh.am (Yerevan Ingestor)
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--msh-text-muted)', marginTop: '0.2rem' }}>
                              Received RF packet and committed to live community feed
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)' }}>
                    via RF Mesh
                  </span>
                )}

                {/* Locate on Map Button */}
                  {hasLocation && onLocateNode && (
                    <button
                      type="button"
                      onClick={() => onLocateNode(msg.from_id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--msh-text-muted)',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.1rem 0.3rem',
                        borderRadius: 4,
                      }}
                      title="Center sender on Armenia Map"
                    >
                      <MapPin size={12} color="var(--ifm-color-primary)" />
                      <span>Locate on Map</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      )}
    </div>
  );
}
