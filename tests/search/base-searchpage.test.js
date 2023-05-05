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

  await t.expect(search.pageSearch.exists).ok();
  await t.expect(search.inputSearch.exists).ok();
  await t.expect(search.btnGo.exists).ok();
  await t.expect(search.actionBar.exists).ok();
});

test('Do search query', async t => {
  const search = new Search();
  let location = await getWindowLocation();
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(search.inputSearch.exists).ok();
  await t.expect(search.btnGo.exists).ok();
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

test('Facets class removal', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  const modalManager = search.appRoot.shadowRoot().find('modal-manager');
  const modalTemplate = modalManager.shadowRoot().find('modal-template');
  const facetModalOpen = modalManager.withAttribute('mode','open');
  const facetModalClosed = modalManager.withAttribute('mode','closed');
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(modalManager.exists).ok(); //check open

  await t.typeText(search.inputSearch, 'hello kitty');
  await t.pressKey('Enter');
  await t.wait(6000); //search to get to more facets

  await t.expect(search.collBrowserLeftColumn.exists).ok();
  await t.expect(search.collFacets.exists).ok();

  const moreBtn = search.collFacets.shadowRoot().find('.more-link');
  await t.expect(moreBtn.exists).ok();
  await t.click(moreBtn);
  await t.wait(1000); //open up the modal

  await t.expect(facetModalOpen.exists).ok();

  const facetStyle = modalManager.withAttribute('class','more-search-facets');
  await t.expect(facetStyle.exists).ok(); //facets class exists check
  
  await t.expect(modalTemplate.exists).ok();

  const closeModal = modalTemplate.shadowRoot().find('.close-button');
  await t.expect(closeModal.exists).ok();
  await t.click(closeModal);
  await t.wait(1000); //close modal

  await t.expect(facetModalClosed.exists).ok(); //check closed

  await t.expect(facetStyle.exists).notOk; //facets class removed check
  
});

