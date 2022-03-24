import { ClientFunction, Selector } from 'testcafe';

const publicBookUrl = 'https://archive.org/embed/bbn0288.0001.001.umich.edu';
fixture`Public book`.page`${publicBookUrl}`;

const getWindowLocation = ClientFunction(() => window.location);
const iaBookReader = Selector('ia-bookreader');

test('Page load', async t => {
  // url starts cold with /details/<id>
  const location = await getWindowLocation();
  await t.expect(location.href).eql(publicBookUrl);

  await t.expect(await iaBookReader().exists).eql(true);
});
