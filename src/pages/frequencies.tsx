import type {ReactNode} from 'react';
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Copy, Check, Radio } from 'lucide-react';

export default function FrequenciesPage(): ReactNode {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  const primaryChannelUrl = 'https://meshtastic.org/e/#CgUSAUFRPT0SEU1lc2h0YXN0aWMgQXJtZW5pYQ==';

  return (
    <Layout
      title="Armenia Frequencies & Channel Settings"
      description="Official RF frequency band standards and channel configurations for Meshtastic Armenia (EU_868, MediumFast)"
    >
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <img
              src="/img/logo-868.svg"
              alt="Armenia 868 MHz Meshtastic Logo"
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                boxShadow: '0 8px 24px -4px rgba(102, 234, 148, 0.35)',
              }}
            />
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'var(--msh-badge-bg)',
            border: '1px solid var(--msh-badge-border)',
            color: 'var(--msh-badge-text)',
            padding: '0.25rem 0.75rem',
            borderRadius: 6,
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            <Radio size={14} />
            <span>COMMUNITY STANDARD: EU_868 MEDIUMFAST</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--msh-text-primary)', margin: '0 0 0.65rem 0' }}>
            Armenia Frequency & Channel Settings
          </h1>
          <p style={{ color: 'var(--msh-text-secondary)', fontSize: '1.05rem', maxWidth: 680, margin: '0 auto' }}>
            To communicate with other nodes across Yerevan, Aragats, Sevan, and regional mountain passes, configure your device with the following parameters.
          </p>
        </div>

        {/* Primary Channel Card */}
        <div style={{
          background: 'var(--msh-card-bg)',
          border: '1px solid var(--msh-card-border)',
          borderRadius: 12,
          padding: '1.75rem',
          marginBottom: '1.75rem',
          boxShadow: 'var(--msh-card-shadow)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{
                background: 'var(--msh-badge-bg)',
                color: 'var(--msh-badge-text)',
                border: '1px solid var(--msh-badge-border)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}>
                Primary Public Channel
              </span>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--msh-text-primary)', margin: '0.5rem 0 0.2rem 0' }}>
                MediumFast (Armenia Standard)
              </h2>
              <p style={{ color: 'var(--msh-text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                The Armenian community has transitioned to <strong>MediumFast</strong> for significantly lower airtime, faster throughput, and reduced channel congestion.
              </p>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(primaryChannelUrl, 'url')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--ifm-color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '0.55rem 0.95rem',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {copied === 'url' ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied === 'url' ? 'Channel Link Copied!' : 'Copy Channel URL'}</span>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem',
            background: 'var(--msh-telemetry-bg)',
            padding: '1.1rem',
            borderRadius: 8,
            border: '1px solid var(--msh-telemetry-border)',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>LoRa Region</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--msh-text-primary)', marginTop: '0.15rem' }}>EU_868</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>Frequency Slot</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ifm-color-primary)', marginTop: '0.15rem' }}>869.525 MHz (Slot 0)</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>Modem Preset</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--msh-text-primary)', marginTop: '0.15rem' }}>MediumFast</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>Default PSK (AES)</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--msh-text-primary)', marginTop: '0.15rem', fontFamily: 'monospace' }}>AQ==</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>Bandwidth / SF / CR</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--msh-text-secondary)', marginTop: '0.15rem' }}>250 kHz / SF9 / CR 4/5</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--msh-text-muted)', textTransform: 'uppercase' }}>Max Hop Limit</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--msh-text-primary)', marginTop: '0.15rem' }}>3 Hops</div>
            </div>
          </div>
        </div>

        {/* Secondary Channels Table */}
        <div style={{
          background: 'var(--msh-card-bg)',
          border: '1px solid var(--msh-card-border)',
          borderRadius: 12,
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: 'var(--msh-card-shadow)',
        }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--msh-text-primary)', marginTop: 0 }}>
            Secondary & Community Channels
          </h3>
          <p style={{ color: 'var(--msh-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            You can configure secondary channels in addition to the primary channel to participate in specific subgroups.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>Channel Name</th>
                  <th>Type</th>
                  <th>PSK Key</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--msh-text-primary)' }}>Emergency-AM</td>
                  <td><span style={{ color: '#dc2626', fontWeight: 600 }}>Emergency</span></td>
                  <td style={{ fontFamily: 'monospace' }}>AQ==</td>
                  <td>Mountaineering distress alerts, search & rescue coordination</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--msh-text-primary)' }}>Telemetry-AM</td>
                  <td><span style={{ color: '#0284c7', fontWeight: 600 }}>Data / Sensor</span></td>
                  <td style={{ fontFamily: 'monospace' }}>AQ==</td>
                  <td>Weather stations, air quality sensors, solar voltage feeds</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700, color: 'var(--msh-text-primary)' }}>Custom / Private</td>
                  <td><span style={{ color: '#9333ea', fontWeight: 600 }}>Encrypted</span></td>
                  <td style={{ fontFamily: 'monospace' }}>Random AES-256</td>
                  <td>Family, private business, or confidential team channels</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/docs/frequencies-and-channels/armenia-standards" className="button button--secondary button--lg">
            Read Complete RF Documentation →
          </Link>
        </div>
      </main>
    </Layout>
  );
}
