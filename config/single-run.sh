#!/bin/bash

export BROWSERSTACK_PROJECT_NAME="IA e2e test"
export BROWSERSTACK_BUILD_ID="ia-e2e"

./node_modules/.bin/testcafe "browserstack:ie@11.0:Windows 10" ./tests
