import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function RequestTimeout(): React.JSX.Element {
  return (
    <Layout title="408 - Request Timeout" description="408 Request Timeout - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={408}
          title="408 - Request Timeout"
          description="The request or LoRa mesh packet took too long to complete and timed out."
        />
      </main>
    </Layout>
  );
}
