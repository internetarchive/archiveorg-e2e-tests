module.exports = {
  color: true,
  quarantineMode: true,
  concurrency: 1,
  browsers: [
    'chrome',
    'firefox',
    /* Headless is used in GHA, adding here for visibility */
    // 'chrome:headless',
    // 'firefox:headless'
  ],
  src: ['tests/**/*test.*'],
  // reporter: {
  //   name: 'json',
  //   output: 'reports/report.json'
  // },
}
