import { ClientFunction } from 'testcafe';

import Search from './Search';

const url = 'https://archive.org/search';

fixture`Search Page`.page`${url}`;

const getWindowLocation = ClientFunction(() => window.location);

test('Page load', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(search.pageSearch.exists).ok();
  await t.expect(search.inputSearch.exists).ok();
  //await t.expect(search.btnGo.exists).ok();
  await t.expect(search.actionBar.exists).ok();
});

test('Do search query', async t => {
  const search = new Search();
  let location = await getWindowLocation();
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(search.inputSearch.exists).ok();
  //await t.expect(search.btnGo.exists).ok();
  await t.expect(search.actionBar.exists).ok();
  await t.typeText(search.inputSearch, 'cats');
  await t.expect(search.inputSearch.value).eql('cats');

  await t.pressKey('Enter');
  await t.wait(6000); // for load
  location = await getWindowLocation();
  
  await t.expect(location.href).eql(`${url}?query=cats`);
  await t.expect(search.collectionBrowser.exists).eql(true);
  await t.expect(search.collBrowserLeftColumn.exists).eql(true);
  await t.expect(search.collFacets.exists).eql(true);

  await t.expect(search.collBrowserRightColumn.exists).eql(true);
  await t.expect(search.sortFilterBar.exists).eql(true);
  await t.expect(search.infiniteScroller.exists).eql(true);
});

