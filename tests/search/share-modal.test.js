import { ClientFunction } from 'testcafe';
import Search from './modals/Search';

const getWindowLocation = ClientFunction(() => window.location);

const url = 'https://archive.org/search';

fixture`Search Page - Share modal`.page`${url}`;

//check if model exists in DOM after click
test('Modal pops up on click', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  const modalManager = search.appRoot.shadowRoot().find('modal-manager');
  const facetsModalOpen = modalManager.withAttribute('mode','open');
  const facetsModalClosed = modalManager.withAttribute('mode','closed');

  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(modalManager.exists).ok(); 

  // check for modal manager closed state
  await t.expect(facetsModalClosed.exists).ok(); 

  //check action bar component
  await t.expect(search.actionBar.exists).ok();
  const actionBarList = search.actionBar.shadowRoot().find('#link-design').find('ul');

  const shareBtn = actionBarList.find('#share');
  await t.click(shareBtn);
  await t.wait(1000); // for load

  //check for modal manager open state
  await t.expect(facetsModalOpen.exists).ok(); // mode check

});
