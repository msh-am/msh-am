import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { Home, Compass, Radio, ArrowLeft, RefreshCw } from 'lucide-react';
import styles from './styles.module.css';

export interface HttpCatItem {
  code: number;
  name: string;
  nameArmenian?: string;
  description: string;
}

export const HTTP_CAT_STATUSES: HttpCatItem[] = [
  {
    code: 400,
    name: 'Bad Request',
    nameArmenian: 'Սխալ հարցում',
    description: 'The server could not understand the request due to invalid syntax.',
  },
  {
    code: 401,
    name: 'Unauthorized',
    nameArmenian: 'Չարտոնված մուտք',
    description: 'Authentication is required and has failed or has not yet been provided.',
  },
  {
    code: 403,
    name: 'Forbidden',
    nameArmenian: 'Մուտքն արգելված է',
    description: 'You do not have permission to access this resource or mesh node.',
  },
  {
    code: 404,
    name: 'Not Found',
    nameArmenian: 'Էջը չի գտնվել',
    description: 'We could not find what you were looking for on the Armenian Meshtastic Portal.',
  },
  {
    code: 408,
    name: 'Request Timeout',
    nameArmenian: 'Ժամանակը սպառվեց',
    description: 'The radio packet or request took too long to travel through the mesh.',
  },
  {
    code: 418,
    name: "I'm a teapot",
    nameArmenian: 'Ես թեյնիկ եմ 🫖',
    description: 'The server refuses to brew coffee because it is, permanently, a teapot.',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    nameArmenian: 'Չափազանց շատ հարցումներ',
    description: 'Rate limit exceeded! Please wait before transmitting more packets.',
  },
  {
    code: 500,
    name: 'Internal Server Error',
    nameArmenian: 'Սերվերի ներքին սխալ',
    description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    nameArmenian: 'Սխալ դարպաս',
    description: 'The server received an invalid response from the upstream gateway or repeater.',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    nameArmenian: 'Ծառայությունն անհասանելի է',
    description: 'The server is currently unable to handle the request due to maintenance or overload.',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    nameArmenian: 'Դարպասի ժամանակը սպառվեց',
    description: 'The gateway did not receive a timely response from an upstream server or node.',
  },
];

export interface HttpCatErrorViewProps {
  statusCode?: number;
  title?: string;
  description?: string;
  showCatExplorer?: boolean;
  interactive?: boolean;
}

export default function HttpCatErrorView({
  statusCode = 404,
  title,
  description,
  showCatExplorer = true,
  interactive = true,
}: HttpCatErrorViewProps): React.JSX.Element {
  const [selectedCode, setSelectedCode] = useState<number>(statusCode);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const currentInfo =
    HTTP_CAT_STATUSES.find((item) => item.code === selectedCode) || {
      code: selectedCode,
      name: `HTTP ${selectedCode}`,
      nameArmenian: `Սխալ ${selectedCode}`,
      description: 'An unexpected HTTP status occurred.',
    };

  const displayTitle =
    title && selectedCode === statusCode
      ? title
      : `${currentInfo.code} - ${currentInfo.name}`;

  const displayDesc =
    description && selectedCode === statusCode
      ? description
      : currentInfo.description;

  const handleSelectCode = (code: number) => {
    if (!interactive) return;
    setImageLoaded(false);
    setImageError(false);
    setSelectedCode(code);
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <h1 className={styles.title}>{displayTitle}</h1>

        <p className={styles.subtitle}>
          {displayDesc}
          {currentInfo.nameArmenian && (
            <span style={{ display: 'block', marginTop: '0.25rem', opacity: 0.85 }}>
              {currentInfo.nameArmenian}
            </span>
          )}
        </p>

        <div className={styles.imageWrapper}>
          {!imageLoaded && !imageError && (
            <div className={styles.imagePlaceholder}>
              <RefreshCw className="animate-spin" size={32} />
              <span>Loading HTTP Cat {selectedCode}...</span>
            </div>
          )}

          {imageError ? (
            <div className={styles.imagePlaceholder}>
              <span>😿 Unable to load cat image for HTTP {selectedCode}</span>
            </div>
          ) : (
            <img
              key={selectedCode}
              src={`https://http.cat/${selectedCode}`}
              alt={`HTTP ${selectedCode}: ${currentInfo.name}`}
              className={styles.catImage}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                // Try fallback to .jpg if bare URL fails
                const target = e.currentTarget;
                if (!target.src.endsWith('.jpg')) {
                  target.src = `https://http.cat/${selectedCode}.jpg`;
                } else {
                  setImageError(true);
                }
              }}
            />
          )}
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            <Home size={18} />
            <span>Back to Home</span>
          </Link>

          <Link to="/docs" className={styles.btnSecondary}>
            <Compass size={18} />
            <span>Wiki & Docs</span>
          </Link>

          <Link to="/dashboard" className={styles.btnSecondary}>
            <Radio size={18} />
            <span>Live Mesh Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
