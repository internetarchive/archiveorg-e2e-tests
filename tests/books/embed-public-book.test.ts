import { ClientFunction } from 'testcafe';

const publicBookUrl =
  'https://ia-petabox-theatre-type-calc-consolidate.archive.org/embed/bbn0288.0001.001.umich.edu';
fixture`Public book`.page`${publicBookUrl}`;

const getWindowLocation = ClientFunction(() => window.location);

test('Page load', async t => {
  // redirects to a URL that specify's br's params
  const location = await getWindowLocation();
  await t
    .expect(location.href)
    .contains('https://archive.org/details/bbn0288.0001.001.umich.edu');
  await t
    .expect(location.href)
    .contains('?view=theater&ui=embed&wrapper=false');
});
