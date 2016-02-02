#!/bin/bash

rev=$(git rev-parse --short HEAD)

git init
git config user.name "Vivek Srinivasan"
git config user.email "vivsriaus@gmail.com"

git remote add origin "https://$GH_TOKEN@github.com/vivsriaus/ARMDoc.git"
git fetch origin
git checkout gh-pages
git pull origin gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q origin HEAD:gh-pages