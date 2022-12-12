import { Selector } from 'testcafe';

export const closeBanner = () => {
  test('Closing banner does not draw it again on reload', async t => {
    const banner = await Selector('header#donate_banner');
    await t.expect(banner.visible).ok();

    const closeBtn = banner.find('button#donate-close-button');
    await t.click(closeBtn);
    await t.eval(() => location.reload());
    await t.wait(2500);

    await t.expect(banner.visible).notOk();
  });
};
