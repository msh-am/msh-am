import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function Conflict(): React.JSX.Element {
  return (
    <Layout title="409 - Conflict" description="409 Conflict - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={409}
          title="409 - Conflict"
          description="The request could not be processed due to a packet or resource state conflict."
        />
      </main>
    </Layout>
  );
}
