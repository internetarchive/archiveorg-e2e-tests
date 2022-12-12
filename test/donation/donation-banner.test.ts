import { ClientFunction } from 'testcafe';
import { closeBanner } from './helpers/banner-close';
import { bannerPaymentFormToDonatePage } from './helpers/banner-form';
// import { bannerSelectDefaults } from './helpers/banner-select-onetime-donation';

const getWindowLocation = ClientFunction(() => window.location);

const detailsPage = 'https://archive.org/details/goody?ymd=2022-04-20';

fixture`Donation Banner loads with query param: "ymd=YYYY-MM-DD"`
  .page`${detailsPage}`;
test('Donation banner loads with query param `ymd`', async t => {
  const location = await getWindowLocation();
  await t.expect(location.href).contains(detailsPage);
});

fixture`"ymd=YYYY-MM-DD" - has payment form`.page`${detailsPage}`;
bannerPaymentFormToDonatePage();

fixture`Close Donation Banner with query param: "ymd=YYYY-MM-DD"`
  .page`${detailsPage}`;
closeBanner();

// fixture`"ymd=YYYY-MM-DD" transfers default choices when pressing Continue`
//   .page`${detailsPage}`;
// bannerSelectDefaults();

const detailsPageBannerLoadWithVariant =
  'https://archive.org/details/goody?variant=JasonSnowglobeTest';

fixture`Donation Banner loads with query param: "variant=<Variant-Name>"`
  .page`${detailsPageBannerLoadWithVariant}`;
test('Donation banner loads with query param `ymd`', async t => {
  // redirects to a URL that specify's br's params
  const location = await getWindowLocation();
  await t.expect(location.href).contains(detailsPageBannerLoadWithVariant);
});

fixture`Close Donation Banner - "variant=<Variant-Name>"`
  .page`${detailsPageBannerLoadWithVariant}`;
closeBanner();

// fixture`"variant=<Variant-Name>" - has payment form`.page`${detailsPage}`;
// bannerPaymentFormToDonatePage();
