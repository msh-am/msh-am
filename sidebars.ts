import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    'intro',
    'why-meshtastic',
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'getting-started/index',
        'getting-started/flashing-firmware',
        'getting-started/mobile-apps',
      ],
    },
    {
      type: 'category',
      label: '📡 Frequencies & Channels (Armenia)',
      collapsed: false,
      items: [
        'frequencies-and-channels/armenia-standards',
        'frequencies-and-channels/channel-settings',
        'frequencies-and-channels/mqtt-settings',
      ],
    },
    {
      type: 'category',
      label: '🛠️ Hardware & Antennas',
      collapsed: false,
      items: [
        'hardware/recommended-devices',
        'hardware/handhelds',
        'hardware/repeaters-and-gateways',
        'hardware/antennas',
        'hardware/solar-repeaters',
      ],
    },
    {
      type: 'category',
      label: '🤝 Community & Etiquette',
      collapsed: false,
      items: [
        'community/etiquette',
        'community/contacts',
      ],
    },
  ],
};

export default sidebars;
