#!/bin/sh
forever stopall
git reset --hard HEAD
git clean -f
git pull
grunt build
npm install
sudo GMAIL_USER=$1 GMAIL_PASS=$2 BLOG_KEY=$3 forever start app.js