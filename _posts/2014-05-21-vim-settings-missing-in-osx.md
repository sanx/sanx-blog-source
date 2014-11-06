---
template: post.html
title: Vim settings missing in OSX
---

I got my new laptop (a 13'' rMBP). Once I started using it, I started noticing
there are a few default settings that an *Ubuntu* install of `vim` has that 
were missing in *OSX* (Mavericks). Here are the few that I've added to my
`~/.vimrc` so far that I've found useful:

    set ruler
    filetype plugin indent on
    syntax on

... and some additional settings to have tabs and shifts be automatically
converted to 4 spaces:

    set expandtab
    set shiftwidth=4
    set tabstop=4
    set softtabstop=4

... and finally, I enable modelines, since I like to use them on my source
files and to support them when opening others' files:

    set modeline
    set modelines=5

