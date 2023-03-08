//validate search page -> query loads
// check that share  = on load = button exists
// on click -> opens modal
// add new workflow file github  -> into main merge pull request
// note: archive book repo for e2e tests

// notes for test docs
// look up : shadow dom
//           reusable functions - testcafe

// look up how to access shadow root
// look up client function
// look up assertions

import { Selector } from 'testcafe';
import Search from './models/Search';
//const appRoot = Selector('app-root');

// x = document.querySelector('app-root')
// x.shadowRoot.querySelector('modal-manager')

// const model = Selector('modal-manager');
// const target = Selector('#share');
//const getWindowLocation = ClientFunction(() => window.location);

fixture`ShareModel`.page`https://archive.org/search`; // improper url ?

//check if model exists in DOM after click
test('Model pops up on click', async t => {
  const search = new Search()

  await t.expect(search.actionBar.exists).ok();
  
  // const shadowRoot = appRoot.shadowRoot();
  // const modalManager = shadowRoot.child('modal-manager');
  // const modalButton = shadowRoot.child('#share');
  // const modalContent = shadowRoot.child('share-modal-content');

  // await t.expect(appRoot.exists).ok();
  // await t.expect(modalManager.exists).ok();
  // await t.expect(modalManager.getAttribute('mode')).eql('closed');
  // await t.expect(modalButton.exists).ok();
  // await t.expect(modalContent.exists).notOk();

  // await t //stops at click target?
  //     .click(target) //click share button
  // await t
  // .expect(model.exists) // check if model exists in DOM
});
