Deploying my Metalsmith-generated, Github-Pages-hosted personal blog from the comfort of `git push`
====

I'm setting up Travis to automatically deploy my Metalsmith-generated blog files.

*   My blog sources (Markdown and Metalsmith scripts to pregenerate html) repo are at:
    `sanx/sanx-blog-source` (master branch)
*   The github-pages repo whose files get published to my user pages is:
    `sanx/sanx.github.io` (master branch)

Steps:

*   `cd ~/sanx-blog-source`
*   `ssh-keygen -f `
*   Github web, repo `sanx/sanx.github.io`. Go to *repo* Settings -> Deploy keys. Add
    a newly generated key. Paste public key. Check "Allow write access". Click on
    "Add key" to save.

Next steps (setup travis build and store encrypted deploy ssh keys) are based on https://docs.travis-ci.com/user/encrypting-files/:

*   Check that `travis -v` is `1.7.0` or later.
*   `travis init` (since I didn't have a `.travis.yml` already)
*   `travis login`
*   `travis encrypt-file sanx.github.io.travis --add` will generate `travis encrypt-file sanx.github.io.travis.enc`
    and modify `.travis.yml` to make the encryption key available to our build.

Add this to `.travis.yml`:

    deploy:
      provider: script
      script: bin/sanx.github.io-deploy.sh
      on:
        branch: master


Create file `bin/sanx.github.io-deploy.sh`:

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


Last steps before trying it all on the Travis server:

*   `git add sanx.github.io.travis.enc` important *not* to add the unencrypted private key!
*   `git add .travis.yml`
*   `git add bin/sanx.github.io-deploy.sh`


Ta-da! I should be all set for my blog's static html pages to be re-generated
by Metalsmith running on Travis on every commit that I push to my blog sources repo.
