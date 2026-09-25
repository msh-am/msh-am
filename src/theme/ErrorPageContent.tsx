import React, { type ReactNode, useState } from 'react';
import Translate from '@docusaurus/Translate';
import {
  ErrorBoundaryError,
  ErrorBoundaryTryAgainButton,
} from '@docusaurus/theme-common';
import type { Props } from '@theme/Error';
import Link from '@docusaurus/Link';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import styles from '@site/src/components/HttpCatErrorView/styles.module.css';

export default function ErrorPageContent({ error, tryAgain }: Props): ReactNode {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <main className="container margin-vert--xl">
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h1 className={styles.title}>
            <Translate
              id="theme.ErrorPageContent.title"
              description="The title of the fallback page when the page crashed"
            >
              This page crashed. (500)
            </Translate>
          </h1>

          <p className={styles.subtitle}>
            An unexpected error occurred while rendering this page. The server or client encountered a problem.
            <span style={{ display: 'block', marginTop: '0.25rem', opacity: 0.85 }}>
              Էջի բեռնման ժամանակ անսպասելի սխալ է տեղի ունեցել։
            </span>
          </p>

          <div className={styles.imageWrapper}>
            {!imageLoaded && (
              <div className={styles.imagePlaceholder}>
                <RefreshCw className="animate-spin" size={32} />
                <span>Loading HTTP 500 Cat...</span>
              </div>
            )}
            <img
              src="https://http.cat/500"
              alt="HTTP 500 Internal Server Error Cat"
              className={styles.catImage}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('.jpg')) {
                  target.src = 'https://http.cat/500.jpg';
                }
              }}
            />
          </div>

          <div className={styles.actions}>
            <ErrorBoundaryTryAgainButton
              onClick={tryAgain}
              className="button button--primary shadow--lw"
            />
            <Link to="/" className={styles.btnSecondary}>
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div style={{ width: '100%', textAlign: 'left', marginTop: '1.5rem' }}>
            <hr style={{ borderColor: 'var(--msh-card-border)' }} />
            <div className="margin-vert--md">
              <ErrorBoundaryError error={error} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
