import { Selector } from 'testcafe';

// has start time & query to serach inside transcript
const radioPlayerPage = 'https://archive.org/details/BBC_Radio_2_20180828_010000?start=2826&q=heroic+deeds';

fixture`Radio Player`.page`${radioPlayerPage}`;

test('Onload: <radio-player> has `skipmusicsections` attribute', async t => {
  const controller = Selector('radio-player-controller').shadowRoot();

  // grab <radio-player> inside of controller's shadow DOM

  // try #1 - make it fail
  // const radioPlayerElement = controller.child('radio-playerz');

  // try #2 - make it succeed
  const radioPlayerElement = controller.child('radio-player');

  await t.expect(radioPlayerElement.exists).ok();

  // check for attribute

  // try #1 - make it fail
  // await t.expect(radioPlayerElement.getAttribute('skipmusicsectionszz')).exists;

  // try #2 - make it succeed
  await t.expect(radioPlayerElement.getAttribute('skipmusicsections')).exists;
});
