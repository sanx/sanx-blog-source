Reconfiguring an installed package in Ubuntu, Debian, and other Ubuntu based
distributions.
====

It's happened to me several times that I `apt-get install` some packages which
prompt me to enter some settings in a `curses` interface, but I don't know which
values to enter at the time, or later on realize that I need different settings
than what I had originally entered.

To see the screen that you saw again, just do:

`sudo dpkg-reconfigure PKG_NAME`

... where `PKG_NAME` is the name of the package whose configuration screens
you wish to see again.
