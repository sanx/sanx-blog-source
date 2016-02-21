#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SOURCE_REPO_DIR=`dirname $DIR`

#npm install
node index.js

rm -rf sanx.github.io || { echo "failed to rm checkout dir"; exit 1; }
mkdir -p sanx.github.io || { echo "failed to mkdir checkout dir"; exit 1; }
cd sanx.github.io || { echo "failed to cd to checkout dir"; exit 1; }
ls $DIR/../sanx.github.io.travis || { echo "ssh private key ('$DIR/../sanx.github.io.travis') not found!"; }
printf "Host github.com \n IdentityFile $SOURCE_REPO_DIR/../sanx.github.io.travis\n" >> ~/.ssh/config || { echo "failed to write to ~/.ssh/config"; exit 1; }
git clone git@github.com:sanx/sanx.github.io.git . || { echo "failed to clone generated blog repo"; exit 1; }

cp -r ../_site/* .
git commit -m "auto commit at: `date`" -a
git push

