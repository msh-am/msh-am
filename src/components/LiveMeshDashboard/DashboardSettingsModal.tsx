import React, { useState } from 'react';
import { X, Check, Globe, RefreshCw, AlertCircle } from 'lucide-react';
import styles from './styles.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEndpoint: string;
  onSaveEndpoint: (url: string) => void;
}

export default function DashboardSettingsModal({
  isOpen,
  onClose,
  currentEndpoint,
  onSaveEndpoint,
}: SettingsModalProps): React.JSX.Element | null {
  const [url, setUrl] = useState(currentEndpoint);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!url.trim()) {
      setTestStatus('idle');
      setTestMessage('Using default Armenian community simulation feed.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Testing endpoint connection...');
    try {
      const res = await fetch(url.trim());
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      const count = Array.isArray(data) ? data.length : (data.nodes?.length ?? 0);
      setTestStatus('success');
      setTestMessage(`Success! Found ${count} nodes from live endpoint.`);
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(`Connection failed: ${err.message || 'CORS or network error'}`);
    }
  };

  const handleSave = () => {
    onSaveEndpoint(url.trim());
    onClose();
  };

  const handleReset = () => {
    setUrl('');
    onSaveEndpoint('');
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleArea}>
            <Globe size={20} className={styles.modalIcon} />
            <h3>Live Mesh Data Source</h3>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalDesc}>
            Migrate seamlessly from PotatoMesh or connect your own Meshtastic MQTT/JSON API endpoint. 
            Enter your API URL below to stream live node telemetry directly to this dashboard.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>Endpoint URL (JSON / PotatoMesh API)</label>
            <input
              type="url"
              placeholder="e.g. https://api.msh.am/nodes or https://mesh.example.com/api/v1/nodes"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setTestStatus('idle');
              }}
              className={styles.modalInput}
            />
            <span className={styles.inputHelp}>
              Leave blank to use the built-in Armenian community simulated telemetry.
            </span>
          </div>

          {testStatus !== 'idle' && (
            <div className={`${styles.testAlert} ${testStatus === 'success' ? styles.testAlertSuccess : styles.testAlertError}`}>
              {testStatus === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              <span>{testMessage}</span>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button type="button" onClick={handleReset} className={styles.resetBtn}>
            Reset to Default
          </button>

          <div className={styles.modalFooterRight}>
            <button
              type="button"
              onClick={handleTestConnection}
              className={styles.testBtn}
              disabled={testStatus === 'testing'}
            >
              <RefreshCw size={14} className={testStatus === 'testing' ? styles.spinning : ''} />
              <span>Test Connection</span>
            </button>
            <button type="button" onClick={handleSave} className={styles.saveBtn}>
              Save & Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
