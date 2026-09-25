import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <Layout title="404 - Not Found" description="404 Not Found - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={404}
          title="404 - Page Not Found"
          description="We could not find what you were looking for on the Armenian Meshtastic Portal."
        />
      </main>
    </Layout>
  );
}
