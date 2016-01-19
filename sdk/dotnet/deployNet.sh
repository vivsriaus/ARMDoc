#!/bin/bash

rev=$(git rev-parse --short HEAD)

#Generate docs
cp -avr src/ResourceManagement/Resource tools/files/
cd tools
mono doxygen.exe Doxyfile

#Copy generated docs to _site
cp -avr html/ ../_site/
cp -avr latext/ ../_site/

cd ../_site

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
