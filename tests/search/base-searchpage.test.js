import { ClientFunction } from 'testcafe';

import Search from './models/Search';

const url = 'https://archive.org/search';

fixture`Search Page`.page`${url}`;

const getWindowLocation = ClientFunction(() => window.location);

test('Page load', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(search.searchPage.exists).ok();
  await t.expect(search.searchInput.exists).ok();
});