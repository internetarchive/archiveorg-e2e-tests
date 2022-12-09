import { ClientFunction, Selector } from 'testcafe';

/**
 * Tests whether submitting a query to the topnav wayback search bar on the given
 * page correctly redirects to the Wayback machine.
 * 
 * @param {TestController} t 
 * @param {string} url The page URL to load
 * @param {NodeSnapshot} webMenuBtn A reference to the topnav's web menu button
 * @param {NodeSnapshot} searchBar A reference to the topnav's wayback search bar
 */
async function baseTest(t, url, webMenuBtn, searchBar) {
  const location = await getWindowLocation();
  await t.expect(location.href).eql(url);

  await t.expect(webMenuBtn).ok();
  await t.click(webMenuBtn);

  await t.expect(searchBar).ok();

  // Submit a search query
  await t.typeText(searchBar, 'foo');
  await t.pressKey('enter');

  const newLocation = await getWindowLocation();
  await t.expect(newLocation.href).contains('https://web.archive.org');
}

//
// Test topnav wayback search from Offshoot page (home page)
//
const homepageUrl = 'https://archive.org/';
fixture`Home page (Offshoot)`.page`${homepageUrl}`;

const getWindowLocation = ClientFunction(() => window.location);

// In the Offshoot case, we need to dig through several layers of shadow DOM to get
// the topnav's wayback search bar
const topnavShadowSelector = Selector('app-root').shadowRoot()
  .find('ia-topnav');
const webMenuBtnShadowSelector = topnavShadowSelector.shadowRoot()
  .find('primary-nav').shadowRoot()
  .find('media-menu').shadowRoot()
  .find('media-button[data-mediatype=web]').shadowRoot()
  .find('a');
const searchBarShadowSelector = topnavShadowSelector.shadowRoot()
  .find('media-slider').shadowRoot()
  .find('media-subnav[menu=web]').shadowRoot()
  .find('wayback-slider').shadowRoot()
  .find('wayback-search').shadowRoot()
  .find('#url');

test('Wayback search from home page topnav', async t => {
  return baseTest(
    t,
    homepageUrl,
    await webMenuBtnShadowSelector(),
    await searchBarShadowSelector(),
  );
});

//
// Test topnav wayback search from non-Offshoot page (details page)
//
const detailsUrl = 'https://archive.org/details/goody';
fixture`Details page (non-Offshoot)`.page`${detailsUrl}`;

// In the non-Offshoot case, we don't need to dig through any shadow DOM
const webMenuBtnSelector = Selector('media-button[data-mediatype=web] a');
const searchBarSelector = Selector('wayback-search #url');

test('Wayback search from details page topnav', async t => {
  return baseTest(
    t,
    detailsUrl,
    await webMenuBtnSelector(),
    await searchBarSelector(),
  );
});
