import { Helmet } from 'react-helmet-async';

import { TacheView } from 'src/sections/taches/view';

// ----------------------------------------------------------------------

export default function TachesListPage() {
  return (
    <>
      <Helmet>
        <title> Taches </title>
      </Helmet>

      <TacheView />
    </>
  );
}
