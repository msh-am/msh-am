import type { ReactNode } from 'react';
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  Users,
  Server,
  Radio,
  Shield,
  ArrowRight,
  BookOpen,
  Send,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function CommunityPage(): ReactNode {
  return (
    <Layout
      title="Community & Ingestion Gateway"
      description="Meshtastic Armenia community portal, Telegram channels, network etiquette, and PotatoMesh Ingester guides for api.msh.am"
    >
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <img
              src="/img/logo-868.svg"
              alt="Meshtastic Armenia Community"
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                boxShadow: '0 8px 24px -4px rgba(102, 234, 148, 0.35)',
              }}
            />
          </div>

          <div
            style={{
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
            }}
          >
            <Users size={14} />
            <span>COMMUNITY HUB & OPERATOR GUIDES</span>
          </div>

          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--msh-text-primary)',
              margin: '0 0 0.75rem 0',
              lineHeight: 1.2,
            }}
          >
            Meshtastic Armenia Community
          </h1>
          <p
            style={{
              color: 'var(--msh-text-secondary)',
              fontSize: '1.1rem',
              maxWidth: 720,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Connecting radio enthusiasts, backcountry hikers, and network operators across Armenia.
            Learn how to deploy nodes, follow mesh etiquette, and feed live packets into{' '}
            <code style={{ color: 'var(--ifm-color-primary)' }}>api.msh.am</code>.
          </p>
        </div>

        {/* Featured: PotatoMesh Ingester Guide Banner */}
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(102, 234, 148, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
            border: '1px solid rgba(102, 234, 148, 0.3)',
            borderRadius: 16,
            padding: '2rem',
            marginBottom: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <div style={{ flex: '1 1 500px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(102, 234, 148, 0.15)',
                  color: 'var(--ifm-color-primary)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                <Sparkles size={13} />
                <span>Operator Guide • api.msh.am</span>
              </div>
              <h2
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: 'var(--msh-text-primary)',
                  margin: '0 0 0.5rem 0',
                }}
              >
                Set Up a PotatoMesh Ingester for api.msh.am 🥔📡
              </h2>
              <p
                style={{
                  color: 'var(--msh-text-secondary)',
                  margin: 0,
                  fontSize: '0.98rem',
                  lineHeight: 1.5,
                }}
              >
                Deploying a stationary base station or mountaintop repeater on Aragats or Sevan?
                Connect your radio directly to a Raspberry Pi or Linux companion via USB Serial or
                TCP to feed ground-truth RF telemetry, link neighbors, and text packets directly to
                the Armenia community dashboard.
              </p>
            </div>

            <Link
              to="/docs/community/potatomesh-ingester"
              className="button button--primary button--lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              <span>Read Setup Guide</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Section Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Card 1: Live Dashboard */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(102, 234, 148, 0.12)',
                color: 'var(--ifm-color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Activity size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Live Mesh Dashboard
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Monitor active online nodes, signal strength (SNR/RSSI), battery percentages, and
              spectrum utilization in real time across Armenia.
            </p>
            <Link
              to="/dashboard"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Open Dashboard</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 2: Network Etiquette */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(59, 130, 246, 0.12)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Shield size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Mesh Etiquette & Rules
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Guidelines for hop limits (default 3), telemetry intervals, broadcast etiquette, and
              the golden rule: never enable Downlink on client nodes.
            </p>
            <Link
              to="/docs/community/etiquette"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Read Etiquette</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 3: Telegram & Contacts */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(168, 85, 247, 0.12)',
                color: '#a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Send size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Community Telegram & Links
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Join the main discussion group at <a href="https://t.me/mesh_am" target="_blank" rel="noreferrer">@mesh_am</a>, trade hardware, request ingestor API tokens, and connect with local makers.
            </p>
            <Link
              to="/docs/community/contacts"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Useful Links & Contacts</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 4: Frequencies & Channel Settings */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(234, 179, 8, 0.12)',
                color: '#eab308',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Radio size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Frequencies & Channels
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Official Armenian LoRa standards: EU_868 band, Slot 0 (869.525 MHz), and the
              transition to MediumFast preset for airtime optimization.
            </p>
            <Link
              to="/frequencies"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>View Frequencies</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 5: MQTT Gateway Guide */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(236, 72, 153, 0.12)',
                color: '#ec4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Server size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Native MQTT Gateway
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Connecting a Wi-Fi-enabled home node directly to <code style={{ fontSize: '0.85rem' }}>mqtt.msh.am</code> using the mobile app without external software.
            </p>
            <Link
              to="/docs/frequencies-and-channels/mqtt-settings"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>MQTT Setup</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Card 6: Getting Started Wiki */}
          <div
            style={{
              background: 'var(--msh-card-bg)',
              border: '1px solid var(--msh-card-border)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--msh-card-shadow)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <BookOpen size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--msh-text-primary)' }}>
              Complete Wiki & Docs
            </h3>
            <p
              style={{
                color: 'var(--msh-text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                flex: 1,
                margin: '0 0 1.25rem 0',
              }}
            >
              Hardware recommendations, flashing guides, solar repeaters, antenna tuning, and
              topographic line-of-sight calculations across Armenia.
            </p>
            <Link
              to="/docs/intro"
              className="button button--secondary button--block"
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Explore Wiki</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Telegram Community Box */}
        <div
          style={{
            background: 'var(--msh-card-bg)',
            border: '1px solid var(--msh-card-border)',
            borderRadius: 16,
            padding: '2rem',
            textAlign: 'center',
            boxShadow: 'var(--msh-card-shadow)',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--msh-text-primary)',
              margin: '0 0 0.5rem 0',
            }}
          >
            Join the Armenian Mesh Telegram Channel
          </h2>
          <p
            style={{
              color: 'var(--msh-text-secondary)',
              fontSize: '1rem',
              maxWidth: 600,
              margin: '0 auto 1.5rem auto',
            }}
          >
            Ask questions, share your signal reports, request PotatoMesh Ingester API tokens, and
            coordinate node deployments with other radio operators.
          </p>
          <a
            href="https://t.me/mesh_am"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--lg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              fontWeight: 700,
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            <Send size={18} />
            <span>Open @mesh_am in Telegram</span>
          </a>
        </div>
      </main>
    </Layout>
  );
}
