#!/bin/bash

export BROWSERSTACK_PROJECT_NAME="IA e2e test"
export BROWSERSTACK_BUILD_ID="ia-e2e"

declare -a browsers=( "browserstack:Chrome@84.0:Windows 10" "browserstack:firefox@79.0:Windows 10" "browserstack:edge@84.0:Windows 10" "browserstack:opera@70.0:Windows 10" )

for i in "${browsers[@]}"
do
	./node_modules/.bin/testcafe "${i}" ./tests
done
