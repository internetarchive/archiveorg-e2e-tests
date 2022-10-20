import { ClientFunction, Selector } from 'testcafe';

const publicBookUrl = 'https://archive.org/search';
fixture`Search Beta`.page`${publicBookUrl}`;

const getWindowLocation = ClientFunction(() => window.location);

test('Page load', async t => {
  // redirects to a URL that specify's br's params
  const location = await getWindowLocation();
  await t.expect(location.href).contains('https://archive.org/search');

  // Search Beta text
  // @ts-ignore
  const searchBeta = Selector(() =>
    // @ts-ignore
    document
      .querySelector('app-root')
      .shadowRoot.querySelector('main')
      .querySelector('router-slot')
      .querySelector('search-page')
      ?.shadowRoot.querySelector('.beta-badge')
  );

  // text input
  // @ts-ignore
  const shadowInput = Selector(() =>
    // @ts-ignore
    document
      .querySelector('app-root')
      .shadowRoot.querySelector('main')
      .querySelector('router-slot')
      .querySelector('search-page')
      ?.shadowRoot.querySelector('collection-search-input')
      ?.shadowRoot.querySelector('ia-clearable-text-input')
      ?.shadowRoot.querySelector('#text-input')
  );

  // Go button
  // @ts-ignore
  const shadowButton = Selector(() =>
    // @ts-ignore
    document
      .querySelector('app-root')
      .shadowRoot.querySelector('main')
      .querySelector('router-slot')
      .querySelector('search-page')
      ?.shadowRoot.querySelector('collection-search-input')
      ?.shadowRoot.querySelector('#go-button')
  );

  await t.expect(searchBeta.exists).ok();
  await t.expect(shadowInput.exists).ok();
  await t.expect(shadowButton.exists).ok();
});
