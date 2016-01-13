#!/bin/bash

rev=$(git rev-parse --short HEAD)

cd _site

git init
git config user.name "Vivek Srinivasan"
git config user.email "vivsriaus@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/vivsriaus/ARMDoc.git"
git checkout --orphan gh-pages
git pull origin gh-pages

# echo "example.com" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push origin gh-pages