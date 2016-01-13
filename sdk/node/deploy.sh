#!/bin/bash

rev=$(git rev-parse --short HEAD)

cd sdk/node/_site

git init
git config user.name "Vivek Srinivasan"
git config user.email "vivsriaus@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/vivsriaus/ARMDoc.git"
git fetch upstream gh-pages

# echo "example.com" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages