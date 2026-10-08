import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { MeshNode } from '../../types/mesh';

interface ActiveLink {
  from: [number, number];
  to: [number, number];
  fromName?: string;
  toName?: string;
}

interface MeshMapInnerProps {
  nodes: MeshNode[];
  selectedNodeId?: string | null;
  onSelectNode?: (node: MeshNode) => void;
  activeLink?: ActiveLink | null;
}

export default function MeshMapInner({
  nodes,
  selectedNodeId,
  onSelectNode,
  activeLink,
}: MeshMapInnerProps): React.JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const darkTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    const lightTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileUrl = isDark ? darkTileUrl : lightTileUrl;

    const map = L.map(mapContainerRef.current, {
      center: [40.1872, 44.5152], // Armenia / Yerevan center
      zoom: 9,
      minZoom: 7,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false,
    });

    // Add clean attribution in corner (No API key required)
    L.control.attribution({
      position: 'bottomright',
      prefix: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, © Esri',
    }).addTo(map);

    const tiles = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '',
    }).addTo(map);

    tileLayerRef.current = tiles;
    mapInstanceRef.current = map;

    // Theme mutation observer to swap tiles seamlessly
    const observer = new MutationObserver(() => {
      const darkNow = document.documentElement.getAttribute('data-theme') === 'dark';
      const newUrl = darkNow ? darkTileUrl : lightTileUrl;
      if (tileLayerRef.current) {
        tileLayerRef.current.setUrl(newUrl);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Resize observer to handle expand/collapse or window resizes cleanly
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers with Nodes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const currentMarkers = markersRef.current;
    const activeIds = new Set<string>();

    nodes.forEach((node) => {
      if (typeof node.latitude !== 'number' || typeof node.longitude !== 'number') return;
      if (isNaN(node.latitude) || isNaN(node.longitude)) return;
      // Filter out invalid/zero coordinates
      if (Math.abs(node.latitude) < 1 || Math.abs(node.longitude) < 1) return;

      activeIds.add(node.id);

      const isRouter = node.role === 'ROUTER' || node.role === 'ROUTER_LATE' || node.role === 'REPEATER';
      const isOnline = node.isOnline;
      const isSelected = selectedNodeId === node.id;

      // Color scheme
      let pinColor = '#10b981'; // Client green
      let roleLabel = 'CLIENT';
      if (node.role === 'ROUTER') {
        pinColor = '#a855f7'; // Router purple
        roleLabel = 'ROUTER';
      } else if (node.role === 'ROUTER_LATE') {
        pinColor = '#8b5cf6'; // Violet
        roleLabel = 'ROUTER_LATE';
      } else if (node.role === 'REPEATER') {
        pinColor = '#c026d3'; // Fuchsia
        roleLabel = 'REPEATER';
      } else if (node.role === 'CLIENT_BASE') {
        pinColor = '#06b6d4'; // Cyan
        roleLabel = 'BASE';
      } else if (node.role === 'CLIENT_HIDDEN') {
        pinColor = '#64748b'; // Slate
        roleLabel = 'HIDDEN';
      } else if (node.role === 'CLIENT_MUTE') {
        pinColor = '#6b7280'; // Gray
        roleLabel = 'MUTE';
      } else if (node.role === 'TRACKER') {
        pinColor = '#f59e0b'; // Amber
        roleLabel = 'TRACKER';
      }

      if (!isOnline) {
        pinColor = '#64748b'; // Muted
      }

      const iconHtml = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        ">
          ${isSelected ? `
            <div style="
              position: absolute;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              border: 2px solid ${pinColor};
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
              opacity: 0.75;
            "></div>
          ` : ''}
          <div style="
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: ${pinColor};
            border: 2px solid #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            transition: transform 0.2s ease;
          " title="${node.shortName} (${node.longName})">
            ${isRouter ? '▲' : '●'}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'mesh-node-marker',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const popupContent = `
        <div style="min-width: 190px; font-family: system-ui, sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <strong style="font-size: 14px; color: var(--msh-text-primary);">${node.shortName}</strong>
            <span style="
              font-size: 10px;
              font-weight: 700;
              padding: 2px 6px;
              border-radius: 4px;
              background: ${pinColor}22;
              color: ${pinColor};
              border: 1px solid ${pinColor}55;
            ">${roleLabel}</span>
          </div>
          <div style="font-size: 12px; color: var(--msh-text-secondary); margin-bottom: 6px; word-break: break-all;">
            ${node.longName}
          </div>
          <div style="font-size: 11px; color: var(--msh-text-muted); display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-top: 1px solid var(--msh-card-border); padding-top: 6px;">
            <div>HW: <span style="color: var(--msh-text-primary);">${(node.hwModel || 'UNKNOWN').replace('_', ' ')}</span></div>
            <div>Bat: <span style="color: var(--msh-text-primary);">${node.batteryLevel != null ? node.batteryLevel + '%' : 'N/A'}</span></div>
            ${node.altitude != null ? `<div>Alt: <span style="color: var(--msh-text-primary);">${Math.round(node.altitude)}m</span></div>` : ''}
          </div>
          <div style="margin-top: 6px; font-size: 10px; color: var(--msh-text-muted); text-align: right;">
            Region: ${node.region || 'Armenia'}
          </div>
        </div>
      `;

      if (currentMarkers[node.id]) {
        currentMarkers[node.id].setLatLng([node.latitude, node.longitude]);
        currentMarkers[node.id].setIcon(customIcon);
        currentMarkers[node.id].setPopupContent(popupContent);
      } else {
        const marker = L.marker([node.latitude, node.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);

        marker.on('click', () => {
          if (onSelectNode) onSelectNode(node);
        });

        currentMarkers[node.id] = marker;
      }
    });

    // Cleanup markers that are no longer active
    Object.keys(currentMarkers).forEach((id) => {
      if (!activeIds.has(id)) {
        currentMarkers[id].remove();
        delete currentMarkers[id];
      }
    });
  }, [nodes, selectedNodeId, onSelectNode]);

  // Handle selectedNodeId pan/flyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedNodeId) return;

    const targetNode = nodes.find((n) => n.id === selectedNodeId);
    if (targetNode && typeof targetNode.latitude === 'number' && typeof targetNode.longitude === 'number') {
      map.flyTo([targetNode.latitude, targetNode.longitude], Math.max(map.getZoom(), 11), {
        duration: 1.0,
      });
      const marker = markersRef.current[targetNode.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedNodeId, nodes]);

  // Handle Active Link Polyline between sender and receiver
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (activeLink) {
      const line = L.polyline([activeLink.from, activeLink.to], {
        color: '#10b981',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.85,
      }).addTo(map);

      polylineRef.current = line;
    }
  }, [activeLink]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '440px',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    />
  );
}
