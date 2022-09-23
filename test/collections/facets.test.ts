import { ClientFunction, Selector } from 'testcafe';

const collectionPage = 'https://archive.org/details/@sketch_the_cow';

const getWindowLocation = ClientFunction(() => window.location);

fixture`Collection Page`.page`${collectionPage}`;
test('Clicking on facet checkbox update URL & refreshes page', async t => {
  const facetLink = Selector('.facet-link');
  await t.expect(facetLink.exists).eql(true);
  await t.expect(facetLink.count).gt(1);

  const facetCheckbox = facetLink.nth(0).child().child();
  await t.expect(facetCheckbox.exists).eql(true);
  await t
    .expect(facetCheckbox.getAttribute('class'))
    .contains('js-facet-checkbox-selection');
  await t.expect(facetCheckbox.checked).eql(false);

  await t.click(facetCheckbox);

  // await t.eval(() => location.reload());
  await t.wait(2000);
  await t.eval(() => location.reload(true));

  const newCheckbox = Selector('.facet-link').nth(0).child().child();
  await t.expect(newCheckbox.checked).eql(true);

  const location = await getWindowLocation();

  await t
    .expect(location.href)
    .contains(
      'https://archive.org/details/@sketch_the_cow?and[]=mediatype%3A%22texts%22'
    );
});
