import { Selector } from 'testcafe';

fixture`Music Player`
  .page`https://archive.org/details/cd_hanna-barbera-cartoon-sound-fx_william-hanna-joseph-barbera`;

test('Page load', async t => {
  const linerNotesPlayer = await Selector('.liner-notes-player');

  await t.expect(linerNotesPlayer.exists).eql(true);
});
