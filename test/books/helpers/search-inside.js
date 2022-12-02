import { ClientFunction } from 'testcafe';
import { TEST_TEXT_NOT_FOUND } from '../../../br-e2e-tests/helpers/mockSearch.js';

// copied from BookReader's `desktopSearch.js` without mock requets
export const runSearchTests = (br, query)=> {
  test('Desktop search - successful search', async t => {
    await t.wait(1000); // wait for search to complete
    const nav = br.nav;

    //assuring that the search bar is enabled
    await t.expect(nav.desktop.searchIcon.visible).ok();
    await t.click(nav.desktop.searchIcon);

    //testing search for a word found in the book
    await t.expect(nav.desktop.searchBox.visible).ok();
    await t.selectText(nav.desktop.searchBox).pressKey('delete');
    // FIXME: Why is it only typing every other letter?!?!
    await t.typeText(nav.desktop.searchBox, query.split('').join('_'));
    await t.pressKey('enter');

    await t.expect(nav.desktop.searchPin.exists).ok();
    await t.expect(nav.desktop.searchPin.child('.BRquery').child('div').exists).ok();
    const searchResult = nav.desktop.searchPin.child('.BRquery').child('div').innerText || '';
    await t.expect(searchResult).contains(query);
    await t.expect(nav.desktop.searchNavigation.exists).ok();
    await t.expect(nav.desktop.searchNavigation.find('[data-id="resultsCount"]').exists).ok();
    await t.expect(nav.desktop.searchNavigation.find('[data-id="resultsCount"]').innerText).contains(3);

    //checking url
    const getPageUrl = ClientFunction(() => window.location.href.toString());
    await t.expect(getPageUrl()).contains(query);

    //checks clicking on first search pin opens correct page
    await t.click(nav.desktop.searchPin);
    await t.expect(getPageUrl()).contains(query);

    //checks highlight on result page is visible
    const highlight = br.shell.find(".searchHiliteLayer rect");
    await t.expect(highlight.visible).ok();
  });


  test('Desktop search - unsuccessful search', async t => {
    await t.wait(1000); // wait for search to complete
    const nav = br.nav;

    //assuring that the search bar is enabled
    await t.expect(nav.desktop.searchIcon.visible).ok();
    await t.click(nav.desktop.searchIcon);

    //testing search for a word not found in the book
    await t.selectText(nav.desktop.searchBox).pressKey('delete');
    // FIXME: Why is it only typing every other letter?!?!
    await t.typeText(nav.desktop.searchBox, TEST_TEXT_NOT_FOUND.split('').join('_'));
    await t.pressKey('enter');
    await t.expect(nav.desktop.searchPin.child('.BRquery').child('div').withText(TEST_TEXT_NOT_FOUND).exists).notOk();

    const getPageUrl = ClientFunction(() => window.location.href.toString());
    await t.expect(getPageUrl()).contains(TEST_TEXT_NOT_FOUND);
  });
};
