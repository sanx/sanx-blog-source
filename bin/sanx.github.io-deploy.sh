#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm install
node index.js

rm -rf sanx.github.io
mkdir -p sanx.github.io || { echo "fail"; exit 1; }
cd sanx.github.io || { echo "fail"; exit 1; }
printf "Host github.com \n IdentityFile $DIR/../sanx.github.io.travis\n" >> ~/.ssh/config
git clone git@github.com:sanx/sanx.github.io.git .

cp -r ../_site/* .
git commit -m "auto commit at: `date`" -a
git push

