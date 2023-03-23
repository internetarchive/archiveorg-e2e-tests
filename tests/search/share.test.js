import { ClientFunction } from 'testcafe';
import Search from './models/Search';

const getWindowLocation = ClientFunction(() => window.location);

const url = 'https://archive.org/search';

fixture`Search Page - Share modal`.page`${url}`;

//check if model exists in DOM after click
test('Modal pops up on click', async t => {
  const search = new Search();
  const location = await getWindowLocation();
  await t.expect(location.href).eql(url);
  await t.wait(1000); // for load

  await t.expect(search.actionBar.exists).ok();
  const actionBarList = search.actionBar.shadowRoot().find('#link-design').find('ul');

  const shareBtn = actionBarList.find('#share');
  await t.click(shareBtn);
  await t.wait(1000); // for load

  const modalManager = search.appRoot.find('modal-manager');
  const shareModal = modalManager.shadowRoot().find('modal-template').find('share-modal-content');
  await t.expect(modalManager.exists).ok();
  await t.expect(shareModal.exists).ok();

});
