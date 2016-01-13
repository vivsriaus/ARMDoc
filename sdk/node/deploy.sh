#!/bin/bash

rev=$(git rev-parse --short HEAD)

cd _site

git init
git config user.name "Vivek Srinivasan"
git config user.email "vivsriaus@gmail.com"

git remote add origin "https://$GH_TOKEN@github.com/vivsriaus/ARMDoc.git"
git fetch origin && git reset origin/gh-pages


#git checkout gh-pages 
#git pull upstream gh-pages

# echo "example.com" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git pull origin gh-pages
git push -q origin HEAD:gh-pages

#install mono
#chmod u+s /usr/bin/sudo
curl -s http://download.mono-project.com/repo/xamarin.gpg | apt-key add -
echo "deb http://download.mono-project.com/repo/debian wheezy main" | tee /etc/apt/sources.list.d/xamarin.list
apt-get update
apt-get -y install mono-complete