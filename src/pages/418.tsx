import React from 'react';
import Layout from '@theme/Layout';
import HttpCatErrorView from '@site/src/components/HttpCatErrorView';

export default function Teapot(): React.JSX.Element {
  return (
    <Layout title="418 - I'm a teapot" description="418 I'm a teapot - Meshtastic Armenia">
      <main className="container margin-vert--lg">
        <HttpCatErrorView
          statusCode={418}
          title="418 - I'm a teapot"
          description="The server refuses the attempt to brew coffee with a teapot. Short and stout! 🫖"
        />
      </main>
    </Layout>
  );
}
