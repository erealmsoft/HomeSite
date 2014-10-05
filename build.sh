#!/bin/sh
forever stopall
git reset --hard HEAD
git clean -f
git pull
grunt build
npm install