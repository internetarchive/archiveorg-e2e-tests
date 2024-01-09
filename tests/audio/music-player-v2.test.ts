import { ClientFunction, Selector } from 'testcafe';

const musicItemUrl =
  'https://ia-petabox-jim-req-ia-squash.archive.org/details/cd_mystery-sound-effects_gateway-gecordings';
fixture`Music Player`.page`${musicItemUrl}`;

const getWindowLocation = ClientFunction(() => window.location);
const linerNotesPlayer = Selector('.liner-notes-player');

test('Page load', async t => {
  // url starts cold with /details/<id>
  const location = await getWindowLocation();
  await t.expect(location.href).eql(musicItemUrl);

  await t.expect(await linerNotesPlayer().exists).eql(true);

  const trackList = await linerNotesPlayer.find('.audio-track-list');
  await t.expect(trackList.exists).eql(true);
  const tracks = await trackList.find('button.track');
  await t.expect(tracks.count).eql(50);

  const firstTrack = await tracks.filter('.selected');
  // first track is selected
  await t.expect(firstTrack.exists).eql(true);
  // first track details
  await t.expect(await firstTrack.getAttribute('data-track-number')).eql('1');
  await t
    .expect(await firstTrack.find('.track-number').withText('1').exists)
    .eql(true);
  await t
    .expect(
      await firstTrack.find('.track-title').withText('Squeaking Door').exists
    )
    .eql(true);
  await t
    .expect(await firstTrack.find('.track-length').withText('00:06').exists)
    .eql(true);

  // has 2 tabs: jwp & bookreader

  // has 2 options: samples & webamp
});

test('JWP: click play triangle to start & autoplay', async t => {
  await t.expect(linerNotesPlayer.exists).eql(true);

  const jwp = await linerNotesPlayer.find('.jwplayer');
  await t.expect(jwp.exists).eql(true);

  const jwpPlayButton = jwp.find('.jw-icon-playback');
  const playerDurationText = jwp.find('.jw-text-duration');

  await t.wait(5000);

  const firstSelectedTrack = await linerNotesPlayer.find(
    'button.track.selected'
  );
  await t
    .expect(await firstSelectedTrack.getAttribute('data-track-number'))
    .eql('1');
  await t.expect(firstSelectedTrack.find('.track-number').innerText).eql('1');
  await t
    .expect(firstSelectedTrack.find('.track-title').innerText)
    .eql('Squeaking Door');
  await t
    .expect(firstSelectedTrack.find('.track-length').innerText)
    .eql('00:06');
  await t.expect(await playerDurationText().innerText).eql('00:06');

  // Showing Play Triangle
  await t.expect(await jwpPlayButton().getAttribute('aria-label')).eql('Play');

  await t.expect(jwpPlayButton.exists).eql(true);

  await t.click(await jwpPlayButton());

  // 6 sec first sample + load
  await t.wait(9500);

  // Showing Pause icon
  await t.expect(await jwpPlayButton().getAttribute('aria-label')).eql('Pause');

  // now we Pause
  await t.click(await jwpPlayButton());

  // confirm player has autoplayed to next track
  const nextSelectedTrack = await linerNotesPlayer.find(
    'button.track.selected'
  );
  await t
    .expect(await nextSelectedTrack.getAttribute('data-track-number'))
    .eql('2');
  await t.expect(nextSelectedTrack.find('.track-number').innerText).eql('2');
  await t.expect(nextSelectedTrack.find('.track-title').innerText).eql('Steps');
  await t
    .expect(nextSelectedTrack.find('.track-length').innerText)
    .eql('00:03');
  await t.expect(await playerDurationText().innerText).eql('00:03');

  // Back to showing Play Triangle
  await t.expect(await jwpPlayButton().getAttribute('aria-label')).eql('Play');
});
