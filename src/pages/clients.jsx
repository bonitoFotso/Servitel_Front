import { Helmet } from 'react-helmet-async';

import { ClientsView } from 'src/sections/clients/view';

// -----------------------------------------------------------------------

export default function TachePage() {
  return (
    <>
      <Helmet>
        <title> client </title>
      </Helmet>

      <ClientsView />
    </>
  );
}
