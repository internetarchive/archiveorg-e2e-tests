import { ClientFunction } from 'testcafe';
import Search from './models/Search';

const getWindowLocation = ClientFunction(() => window.location);

const url = 'https://archive.org/search';

fixture`Search Page - Share modal`.page`${url}`;

//check if model exists in DOM after click
test('Modal pops up on click', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  const modalManager = search.appRoot.shadowRoot().find('modal-manager');
  const shareModalOpen = modalManager.withAttribute('mode','open');
  const shareModalClosed = modalManager.withAttribute('mode','closed');

  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(modalManager.exists).ok(); 

  // check for modal manager closed state
  await t.expect(shareModalClosed.exists).ok(); 

  //check action bar component
  await t.expect(search.actionBar.exists).ok();
  const actionBarList = search.actionBar.shadowRoot().find('#link-design').find('ul');

  const shareBtn = actionBarList.find('#share');
  await t.click(shareBtn);
  await t.wait(1000); // for load

  //check for modal manager open state
  await t.expect(shareModalOpen.exists).ok(); // mode check

});
