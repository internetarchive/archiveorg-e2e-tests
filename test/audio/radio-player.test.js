import { Selector } from 'testcafe';

// has start time & query to serach inside transcript
const radioPlayerPage = 'https://archive.org/details/BBC_Radio_2_20180828_010000?start=2826&q=heroic+deeds';

fixture`Radio Player`.page`${radioPlayerPage}`;

test('Onload: Skips music sections by default', async t => {
  // archive.org sets <radio-player>'s behaviour to skip music sections
  // this is by setting `skipmusicsections` attribute on the component
  // the radio player repo has robust unit & integration tests for its expected behaviour
  // here, we want to confirm that archive.org's usage applies `skipmusicsections` attr.

  const controller = Selector('radio-player-controller').shadowRoot();
  await t.expect(controller.exists).ok();

  // grab <radio-player> inside of controller's shadow DOM
  const radioPlayerElement = controller.child('radio-player');
  await t.expect(radioPlayerElement.exists).ok();

  // check for attribute
  await t.expect(radioPlayerElement.getAttribute('skipmusicsections')).exists;
});
