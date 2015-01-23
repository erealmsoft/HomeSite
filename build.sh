#!/bin/sh
git reset --hard HEAD
git pull origin master
npm install
git clean -f
grunt build
if [ "${1}" = "" ] || [ "${1}" != "restart" ]; then
echo "start"
pm2 kill
fi
pm2 ${1:-start} app.js