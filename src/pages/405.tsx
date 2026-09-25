import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function MethodNotAllowed(): React.JSX.Element {
  return (
    <Layout title="405 - Method Not Allowed" description="405 Method Not Allowed - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={405}
          title="405 - Method Not Allowed"
          description="The request method is not supported for this resource."
        />
      </main>
    </Layout>
  );
}
