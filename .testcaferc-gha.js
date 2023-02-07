module.exports = {
    skipJsErrors: true,
    color: true,
    quarantineMode: true,
    concurrency: 1,
    browsers: [
        /* Headless is used in GHA, adding here for visibility */
        'chrome:headless',
        'firefox:headless'
      ],
    src: ['test/**/*test.*'],
}
