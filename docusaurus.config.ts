import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Meshtastic Armenia Community',
  tagline: 'Meshtastic Armenia Community Wiki & Live Mesh Portal | msh.am',
  favicon: 'favicon.ico?v=2',

  url: 'https://msh.am',
  baseUrl: '/',

  organizationName: 'msh-am',
  projectName: 'msh-am',

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hy', 'ru'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
      hy: {
        label: 'Հայերեն',
        direction: 'ltr',
        htmlLang: 'hy',
      },
      ru: {
        label: 'Русский',
        direction: 'ltr',
        htmlLang: 'ru',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/msh-am/msh-am/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg?v=2',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate icon',
        href: '/favicon.ico?v=2',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/favicon-32x32.png?v=2',
      },
    },
  ],

  themeConfig: {
    image: 'img/msh-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MSH.AM',
      logo: {
        alt: 'Meshtastic Armenia Community Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki & Docs',
        },
        {
          to: '/dashboard',
          label: 'Live Dashboard',
          position: 'left',
        },
        {
          to: '/frequencies',
          label: 'Frequencies',
          position: 'left',
        },
        {
          href: 'https://t.me/mesh_am',
          label: 'Telegram',
          position: 'right',
        },
        {
          href: 'https://github.com/msh-am/msh-am',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Meshtastic Armenia Community Logo',
        src: 'img/logo.svg',
        href: '/',
        width: 40,
        height: 40,
      },
      links: [
        {
          title: 'Wiki & Guides',
          items: [
            {
              label: 'Why Meshtastic?',
              to: '/docs/why-meshtastic',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Armenia Standards',
              to: '/docs/frequencies-and-channels/armenia-standards',
            },
            {
              label: 'Channel Settings',
              to: '/docs/frequencies-and-channels/channel-settings',
            },
            {
              label: 'MQTT Gateway Setup',
              to: '/docs/frequencies-and-channels/mqtt-settings',
            },
            {
              label: 'Hardware Guide',
              to: '/docs/hardware/recommended-devices',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram Community (@mesh_am)',
              href: 'https://t.me/mesh_am',
            },
            {
              label: 'Live Mesh Dashboard',
              to: '/dashboard',
            },
            {
              label: 'Meshtastic Official',
              href: 'https://meshtastic.org',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Web Flasher',
              href: 'https://flasher.meshtastic.org',
            },
            {
              label: 'Web Client',
              href: 'https://client.meshtastic.org',
            },
            {
              label: 'GitHub Repo',
              href: 'https://github.com/msh-am/msh-am',
            },
            {
              label: 'Meshtastic Trademark Rules',
              href: 'https://meshtastic.org/docs/legal/licensing-and-trademark/',
            },
          ],
        },
      ],
      copyright: `
        <div style="font-size: 0.825rem; line-height: 1.5; opacity: 0.85; max-width: 800px; margin: 0 auto; text-align: center;">
          <p style="margin-bottom: 0.4rem;">
            Meshtastic Armenia Community (msh.am) © ${new Date().getFullYear()} — Licensed under <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">GNU GPL v3.0</a> (matching upstream Meshtastic).
          </p>
          <p style="font-size: 0.75rem; color: var(--ifm-footer-color); margin: 0;">
            This site is an independent, community-driven project and is not affiliated with, sponsored by, or endorsed by the Meshtastic project or Meshtastic LLC.
            <strong>Meshtastic®</strong> is a registered trademark of Meshtastic LLC. Meshtastic software components are released under various open-source licenses. No warranty is provided — use at your own risk.
          </p>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
