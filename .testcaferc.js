module.exports = {
    color: true,
    quarantineMode: true,
    debugOnFail: true,
    browsers: [
        "chrome",
        "firefox",
        /* Headless is used in GHA, adding here for visibility */
        // "chrome:headless",
        // "firefox:headless"
      ],
    src: ["/home/user/tests/**/*.js", "!test/music/**"]
}
