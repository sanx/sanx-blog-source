---
layout: post
title: Ruby/Jekyll/Github Pages/OSX madness!
---

Trying to get my Jekyll blog setup locally on my new Mac, I've been following
these steps, and encountering the following issues:

I remembered that I would need to use `bundle` to launch my Jekyll instance
in order for it to work the same way as it does on the hosted Github Pages, so I
ran:

```bash
    sudo gem install bundle
```

output:

    Fetching: bundler-1.6.2.gem (100%)
    Successfully installed bundler-1.6.2
    Fetching: bundle-0.0.1.gem (100%)
    Successfully installed bundle-0.0.1
    Parsing documentation for bundler-1.6.2
    Installing ri documentation for bundler-1.6.2
    Parsing documentation for bundle-0.0.1
    Installing ri documentation for bundle-0.0.1
    2 gems installed

as Borat would say: "nice! I like!". I like, indeed!

I also remembered that for everything that the hosted Github Pages does
to work locally, I had to install the `git-pages` *gem*. I tried doing so:

```bash
    sudo gem install github-pages
```

output:

    Fetching: liquid-2.5.5.gem (100%)
    Successfully installed liquid-2.5.5
    Fetching: fast-stemmer-1.0.2.gem (100%)
    Building native extensions.  This could take a while...
    ERROR:  Error installing github-pages:
            ERROR: Failed to build gem native extension.

        /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/bin/ruby extconf.rb
    creating Makefile

    make "DESTDIR="
    compiling porter.c
    porter.c:359:27: warning: '&&' within '||' [-Wlogical-op-parentheses]
          if (a > 1 || a == 1 && !cvc(z, z->k - 1)) z->k--;
                    ~~ ~~~~~~~^~~~~~~~~~~~~~~~~~~~
    porter.c:359:27: note: place parentheses around the '&&' expression to silence this warning
          if (a > 1 || a == 1 && !cvc(z, z->k - 1)) z->k--;
                              ^
                       (                          )
    1 warning generated.
    compiling porter_wrap.c
    linking shared-object stemmer.bundle
    clang: error: unknown argument: '-multiply_definedsuppress' [-Wunused-command-line-argument-hard-error-in-future]
    clang: note: this will be a hard error (cannot be downgraded to a warning) in the future
    make: *** [stemmer.bundle] Error 1


    Gem files will remain installed in /Library/Ruby/Gems/2.0.0/gems/fast-stemmer-1.0.2 for inspection.
    Results logged to /Library/Ruby/Gems/2.0.0/gems/fast-stemmer-1.0.2/ext/gem_make.out

... oopsie, there were at least some native packages that could not be built
on my system. After some investigation, I finally got it working and contributed my solution to **Stack Overflow**
on [here](http://stackoverflow.com/a/23795873/1369119). Damn, it feels good to be a gangster!

Now, I'm able to run `bundle exec jekyll serve` on my Mac locally, and it fires
up an instance of my **Github Pages**/**Jekyll** blog on port 4000.
