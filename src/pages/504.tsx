import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function GatewayTimeout(): React.JSX.Element {
  return (
    <Layout title="504 - Gateway Timeout" description="504 Gateway Timeout - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={504}
          title="504 - Gateway Timeout"
          description="The mesh gateway did not receive a response in time from the upstream repeater."
        />
      </main>
    </Layout>
  );
}
