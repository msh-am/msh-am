import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function InternalServerError(): React.JSX.Element {
  return (
    <Layout title="500 - Internal Server Error" description="500 Internal Server Error - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={500}
          title="500 - Internal Server Error"
          description="The server encountered an unexpected error and was unable to complete your request."
        />
      </main>
    </Layout>
  );
}
