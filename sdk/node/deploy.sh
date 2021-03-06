#!/bin/bash

rev=$(git rev-parse --short HEAD)

cp -avr static/fonts _site/
cp -avr static/scripts _site/
cp -avr static/styles _site/

cd _site

git init
git config user.name "Vivek Srinivasan"
git config user.email "vivsriaus@gmail.com"

git remote add origin "https://$GH_TOKEN@github.com/vivsriaus/ARMDoc.git"
git fetch origin && git reset origin/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git pull origin gh-pages
git push -q origin HEAD:gh-pages
