---
title: Deploying my Metalsmith-generated, Github-Pages-hosted personal blog from the comfort of `git push`
---

I'm setting up [Travis](https://travis-ci.org) to automatically deploy my Metalsmith-generated blog files.

*   My blog sources (Markdown and Metalsmith scripts to pregenerate html) repo are at:
    [sanx/sanx-blog-source](https://github.com/sanx/sanx-blog-source) (master branch)
*   The github-pages repo whose files get published to my user pages is:
    [sanx/sanx.github.io](https://github.com/sanx/sanx.github.io) (master branch)

Steps:

*   `cd ~/sanx-blog-source`
*   `ssh-keygen -f `
*   Github web, repo [sanx/sanx.github.io](https://github.com/sanx/sanx.github.io). Go to
    _*repo* Settings_ -> _Deploy keys_. Generate a new ssh key (I used `ssh-keygen -f sanx.github.io.travis`
    and specified an empty passphrase twice when prompted). Paste public key on Github's _*repo* Settings_ -> _Deploy keys_
    textarea. Check "Allow write access". Finally, click on "Add key" to give this new ssh key permission
    to write just to this one repository.

Next steps (setup travis build and store encrypted deploy ssh keys) are based on https://docs.travis-ci.com/user/encrypting-files/:

*   Check that `travis -v` is `1.7.0` or later.
*   `travis init` (since I didn't have a `.travis.yml` already)
*   `travis login`
*   `travis encrypt-file sanx.github.io.travis --add` will generate `travis encrypt-file sanx.github.io.travis.enc`
    and modify `.travis.yml` to make the encryption key available to our build.

Add this to `.travis.yml`:

    before_install:
    - openssl aes-256-cbc -K $encrypted_57703ae61a7e_key -iv $encrypted_57703ae61a7e_iv
      -in sanx.github.io.travis.enc -out ~/.ssh/sanx.github.io.travis -d # this line was
      # originally added by the travis encrypt-file command above, but I modified the part
      # after -out to specify that I want the ssh key to be decrypted and put under ~/.ssh/
    - chmod u=rw,og= ~/.ssh/sanx.github.io.travis
    - echo "Host github.com" >> ~/.ssh/config
    - echo "IdentityFile ~/.ssh/sanx.github.io.travis" >> ~/.ssh/config
    - git config --global user.email "gerardo@gerardomoad.com"
    - git config --global user.name "Gerardo Moad"
    deploy:
      provider: script
      script: bin/sanx.github.io-deploy.sh
      on:
        branch: master


Create file `bin/sanx.github.io-deploy.sh`:

    #!/usr/bin/env bash
    
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    SOURCE_REPO_DIR=`dirname $DIR`
    
    npm install
    node index.js
    
    rm -rf sanx.github.io || { echo "failed to rm checkout dir"; exit 1; }
    mkdir -p sanx.github.io || { echo "failed to mkdir checkout dir"; exit 1; }
    cd sanx.github.io || { echo "failed to cd to checkout dir"; exit 1; }
    git clone git@github.com:sanx/sanx.github.io.git . || { echo "failed to clone generated blog repo"; exit 1; }
    
    cp -r ../_site/* .
    git commit -m "auto commit at: `date`" -a
    git push


Last steps before trying it all on the Travis server:

*   `git add sanx.github.io.travis.enc` important *not* to add the unencrypted private key to *any* repo!
*   `git add .travis.yml`
*   `git add bin/sanx.github.io-deploy.sh`


Ta-da! I'm all set for my blog's static html pages to be re-generated
by Metalsmith running on Travis on every commit that I push to my blog sources repo.
