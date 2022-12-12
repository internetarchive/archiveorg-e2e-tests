import { Selector } from 'testcafe';

export const bannerPaymentFormToDonatePage = () => {
  test('Donation banner has amount form', async t => {
    const form = await Selector('donation-form-edit-donation');
    await t.expect(form.visible).ok();

    // shadow root is open and has children
    await t.expect(form.shadowRoot().hasChildNodes).ok();

    // has expected attributes populated by AB test & banner code
    await t.expect(form.hasAttribute('amountoptions')).ok();
    await t.expect(form.hasAttribute('defaultselectedamount')).ok();
    await t.expect(form.hasAttribute('amountselectionlayout')).ok();
    await t.expect(form.hasAttribute('frequencyselectionmode')).ok();
    await t.expect(form.hasAttribute('stepnumbermode')).ok();
  });
};
