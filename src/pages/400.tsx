import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function BadRequest(): React.JSX.Element {
  return (
    <Layout title="400 - Bad Request" description="400 Bad Request - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={400}
          title="400 - Bad Request"
          description="The server could not understand the request due to invalid syntax or corrupted packet."
        />
      </main>
    </Layout>
  );
}
