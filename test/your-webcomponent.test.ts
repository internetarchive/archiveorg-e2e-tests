import 'testcafe';

fixture`Music Player`
  .page`https://archive.org/details/cd_hanna-barbera-cartoon-sound-fx_william-hanna-joseph-barbera`;

test('Page load', async t => {
  await t.typeText('#theatre-ia', 'John Smith').click('#submit-button');
});
