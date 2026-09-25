import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function BadGateway(): React.JSX.Element {
  return (
    <Layout title="502 - Bad Gateway" description="502 Bad Gateway - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={502}
          title="502 - Bad Gateway"
          description="The gateway received an invalid response from the upstream server or repeater."
        />
      </main>
    </Layout>
  );
}
