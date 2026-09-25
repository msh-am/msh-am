import type { ReactNode } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import LiveBanner from '@site/src/components/LiveMeshDashboard/LiveBanner';
import {
  Radio,
  Mountain,
  ShieldCheck,
  Activity,
  BookOpen,
  Send,
  Zap
} from 'lucide-react';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLogoWrapper}>
            <img
              src="/img/logo.svg"
              alt="Meshtastic Armenia Community Logo"
              className={styles.heroLogo}
              width={92}
              height={92}
            />
          </div>

          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            <span>INDEPENDENT COMMUNITY RADIO MESH • ARMENIA</span>
          </div>

          <Heading as="h1" className={styles.heroTitle}>
            Meshtastic <span className={styles.heroHighlight}>Armenia</span> Community
          </Heading>

          <p className={styles.heroSubtitle}>
            An independent, resilient, community-driven LoRa radio network across the Republic of Armenia.
            No cell towers, no internet, zero monthly fees.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs">
              <BookOpen size={17} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Explore Wiki & Guides
            </Link>

            <Link
              className="button button--secondary button--lg"
              to="/dashboard">
              <Activity size={17} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Live Mesh Dashboard
            </Link>

            <Link
              className="button button--outline button--lg"
              to="/frequencies">
              <Radio size={17} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              EU_868 Channels
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Meshtastic Armenia Community Portal & Wiki (msh.am)"
      description="Meshtastic Armenia Community documentation, guides, hardware reviews, and real-time live telemetry dashboard for the Armenian mesh network."
    >
      {/* Live Online Dashboard Strip on Top */}
      <LiveBanner />

      <HomepageHeader />

      <main>
        {/* Core Pillars */}
        <section className={styles.pillarsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Why Meshtastic in Armenia?</h2>
              <p>Engineered for alpine geography, civil resilience, and emergency communications.</p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon} style={{ background: 'var(--msh-badge-bg)', color: 'var(--ifm-color-primary)' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3>100% Off-Grid & Resilient</h3>
                <p>
                  Zero reliance on commercial GSM/LTE cellular networks or fiber optics. If grid blackouts or earthquakes strike, the mesh continues operating autonomously.
                </p>
                <Link to="/docs/why-meshtastic" className={styles.cardLink}>
                  Emergency readiness details →
                </Link>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon} style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' }}>
                  <Activity size={24} />
                </div>
                <h3>Optimized Live Dashboard</h3>
                <p>
                  A lightweight, zero-lag, mobile-optimized alternative to PotatoMesh. Track active online nodes, signal strength (SNR), battery percentages, and repeater status in real time.
                </p>
                <Link to="/dashboard" className={styles.cardLink}>
                  Open live dashboard →
                </Link>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon} style={{ background: 'rgba(147, 51, 234, 0.1)', color: '#9333ea' }}>
                  <Mountain size={24} />
                </div>
                <h3>Alpine & Mountain Relays</h3>
                <p>
                  Strategic autonomous solar repeaters on Mount Aragats, Lake Sevan, and regional mountain passes provide line-of-sight coverage between cities and remote valleys.
                </p>
                <Link to="/docs/hardware/solar-repeaters" className={styles.cardLink}>
                  Solar repeater blueprints →
                </Link>
              </div>

              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon} style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                  <Zap size={24} />
                </div>
                <h3>Armenia RF Standards (EU_868)</h3>
                <p>
                  Standardized on EU_868 MediumFast for low airtime and fast messaging, with AES-256 private channel encryption support.
                </p>
                <Link to="/docs/frequencies-and-channels/armenia-standards" className={styles.cardLink}>
                  View frequency specs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Quickstart Section */}
        <section className={styles.quickstartSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Get Started in 3 Steps</h2>
              <p>Everything you need to join the Armenian mesh today.</p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h4>Get an 868 MHz Radio</h4>
                <p>Pick up a Heltec V3 ($25), LilyGO T-Echo ($55), or RAK WisBlock with a tuned 868 MHz antenna.</p>
                <Link to="/docs/hardware/recommended-devices">Hardware recommendations →</Link>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h4>Flash via Browser</h4>
                <p>Connect your device via USB and flash the latest firmware in 2 minutes at flasher.meshtastic.org.</p>
                <Link to="/docs/getting-started/flashing-firmware">Flashing tutorial →</Link>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h4>Pair & Configure</h4>
                <p>Install the Meshtastic app on Android or iOS, pair via Bluetooth, set region to EU_868 MediumFast, and connect!</p>
                <Link to="/docs/getting-started/mobile-apps">Mobile app setup →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Telegram Community Banner */}
        <section className={styles.communityCta}>
          <div className="container">
            <div className={styles.ctaBox}>
              <div className={styles.ctaContent}>
                <h2>Join the Meshtastic Armenia Community</h2>
                <p>Connect with operators, test signal coverage across Armenia, and participate in repeater deployments.</p>
              </div>
              <div className={styles.ctaActions}>
                <a
                  href="https://t.me/mesh_am"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--primary button--lg"
                  style={{ background: '#0088cc', borderColor: '#0088cc', color: '#ffffff' }}
                >
                  <Send size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Join @mesh_am on Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
