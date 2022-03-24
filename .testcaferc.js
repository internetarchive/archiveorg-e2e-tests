module.exports = {
    color: true,
    quarantineMode: true,
    concurrency: 2,
    browsers: [
        "chrome",
        "firefox",
        /* Headless is used in GHA, adding here for visibility */
        // "chrome:headless",
        // "firefox:headless"
      ],
    src: ["test/**/*test.*", "!test/music/**"]
}
