import { Helmet } from 'react-helmet-async';

import { TestView } from 'src/sections/test/view';

// -----------------------------------------------------------------------

export default function TestPage() {
  return (
    <>
      <Helmet>
        <title> page de test </title>
      </Helmet>

      <TestView />
    </>
  );
}