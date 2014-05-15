---
layout: post
title: Setting up `tmux`
---

Now that I've *kind of* lost (I hope that I haven't, but I've been lazy to unbury it from my backups, plus I like being kind of forced to re-do my setup from scratch) my old \*nix setup, including my .bashrc and my tmux setup, I need to re-do my tmux setup file.

I like tmux to act gnu screen-ish (mainly having `Ctrl-A` as the start of command sequences, and having both `Ctrl-A Ctrl-A` and `Ctrl-A A` act as _jump to last seen panel_ sequence. I think that's all I need from gnu screen that's initially missing in tmux.

_Update_: A few days after I initially wrote this post, I realized that about the only settings that I need to change in order to feel comfortable using `tmux` are:

*   the default escape sequence (`Ctrl-B` by default) to `Ctrl-A` (a la _GNU_ `screen`)
*   use `vi` keys for navigating the screen (while in copy or command modes)
*   (bonus) have a nice visual distinction between the currently active window, the last active window, and the rest of the windows on the bottom status bar

This was accomplished easily by putting the following `.tmux.conf` in my home directory:

    # change the default escape sequence form Ctrl-B to Ctrl-A:
    set-option -g prefix C-a
    unbind-key C-b
    bind-key C-a send-prefix

    # use "vi" style screen navigation (as opposed to Emacs, which is what tmux uses by default):
    setw -g mode-keys vi
    set -g status-keys vi

    # make currently active and last active parts of the status bar different from the rest of the windows:
    set-option -gw window-status-current-bg "green"
    set-option -gw window-status-current-attr "italics"

    set-option -gw window-status-last-bg "green"
    set-option -gw window-status-last-attr "bold"
