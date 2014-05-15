---
layout: post
title: Redirect to file as sudo
---

When you want to run a command as you or as some other regular user (i.e., not a superuser), but you need to redirect the output to a file that is/should be owned by root.

Say I have a script called `generate_apache_config`, which, given a domain name and a path (representing a site's webroot), generates an apache `.conf` file.

Furthermore, say we got this script from someone else, and we're too lazy to code-review it. In this case, the only sensible way to make use of the script is **not to run it with superuser privileges**.


The following doesn't work, because our user can't write a new file to the `/etc/apache2/available-sites/` directory:

    generate_apache_config DOMAIN_NAME WEBROOT > /etc/apache2/available-sites/DOMAIN_NAME.conf
    #doesn't work because our regular user can't create a file under that directory

One may think that executing the whole thing as sudo may make this work, but it won't, because only command `generate_apache_config` is invoked as sudo. `tee` is still invoked as our user:

    sudo generate_apache_config DOMAIN_NAME WEBROOT > /etc/apache2/available-sites/DOMAIN_NAME.conf
    #doesn't work because redirecting to output file is done as regular user

Use the `tee` command instead. Only the `tee` command is invoked with sudo:

    generate_apache_config DOMAIN_NAME WEBROOT | sudo tee /etc/apache2/available-sites/DOMAIN_NAME.conf
    #works! we invoke our script with regular user privileges, and then redirect to tee, which we invoke as a super user with sudo
