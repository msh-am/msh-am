import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function TooManyRequests(): React.JSX.Element {
  return (
    <Layout title="429 - Too Many Requests" description="429 Too Many Requests - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={429}
          title="429 - Too Many Requests"
          description="Rate limit exceeded! Please wait before transmitting more mesh packets."
        />
      </main>
    </Layout>
  );
}
