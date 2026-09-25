import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function Forbidden(): React.JSX.Element {
  return (
    <Layout title="403 - Forbidden" description="403 Forbidden - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={403}
          title="403 - Forbidden"
          description="Access to this mesh node, repeater admin, or section is strictly forbidden."
        />
      </main>
    </Layout>
  );
}
