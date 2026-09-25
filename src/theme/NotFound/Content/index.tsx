import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/NotFound/Content';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function NotFoundContent({ className }: Props): ReactNode {
  return (
    <main className={clsx('container margin-vert--lg', className)}>
      <HttpCatErrorView
        statusCode={404}
        title="404 - Page Not Found"
        showCatExplorer={true}
      />
    </main>
  );
}
