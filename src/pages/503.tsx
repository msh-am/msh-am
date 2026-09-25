import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function ServiceUnavailable(): React.JSX.Element {
  return (
    <Layout title="503 - Service Unavailable" description="503 Service Unavailable - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={503}
          title="503 - Service Unavailable"
          description="The server is temporarily overloaded or down for scheduled maintenance."
        />
      </main>
    </Layout>
  );
}
