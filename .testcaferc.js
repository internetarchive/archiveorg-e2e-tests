module.exports = {
    skipJsErrors: true,
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
    src: ['test/**/*test.*'],
    // reporter: {
    //   name: 'json',
    //   output: 'reports/report.json'
    // },
}
