import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function Unauthorized(): React.JSX.Element {
  return (
    <Layout title="401 - Unauthorized" description="401 Unauthorized - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={401}
          title="401 - Unauthorized"
          description="Authentication is required to access this resource or mesh admin portal."
        />
      </main>
    </Layout>
  );
}
