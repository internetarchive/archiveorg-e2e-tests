import { Selector, ClientFunction } from 'testcafe';

const locationHref = ClientFunction(() => window.location.href.toString());

export const bannerSelectDefaults = () => {
  test('Donation banner payment form to donate page', async t => {
    const form = await Selector('donation-form-edit-donation');
    await t.expect(form.visible).ok();

    // shadow root is open and has children
    await t.expect(form.shadowRoot().hasChildNodes).ok();

    const continueButton = await Selector('button#continue-button');
    await t.expect(continueButton.visible).ok();
    await t.click(continueButton);
    await t.wait(2500);

    // check url to confirm we are on donate page
    await t.expect(locationHref()).match(/foo/);

    //
  });
};
