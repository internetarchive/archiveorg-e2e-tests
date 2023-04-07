module.exports = {
  skipJsErrors: true,
  skipUncaughtErrors: true, // https://github.com/DevExpress/testcafe/issues/6807
  color: true,
  quarantineMode: true,
  concurrency: 1,
  browsers: [
    /* Headless is used in GHA, adding here for visibility */
    'chrome:headless',
    'firefox:headless',
    'browserstack:chrome@79.0:Windows 10'
  ],
  src: ['tests'],
  reporter: {
    name: 'json',
    output: 'reports/report.json'
  },
}
