#!/bin/sh
git reset --hard HEAD
git pull origin master
npm install
git clean -f
grunt build
if [ "${1}" = "" ] || [ "${1}" != "restart" ]; then
echo "start"
forever stopall
fi
forever ${1:-start} app.js