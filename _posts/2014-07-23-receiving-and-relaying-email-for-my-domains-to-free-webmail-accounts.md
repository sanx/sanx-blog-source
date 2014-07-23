Receiving and relaying email for my domains over to free webmail accounts.
====

Goal
----

*   Be able to receive email addressed to email addresses in domains that I own
on commercial, free webmail accounts (or any other kind of email system,
really).
*   Not pay any extra money for this (beyond what I'm paying for domain
registration, DNS hosting, and my server).

Prerequisites
----

*    Have some domains that you're in control of, e.g.: the domain resolves
to a host that you control, you have access to the DNS hosting account and
are able to add/remove/modify DNS records (especially MX records).
*    Have control over a host on the internet where you'll be pointing some
records of your domains to. For this guide, I'm using Debian-based Ubuntu Linux
Server distribution version 14.04 LTS.

Steps
----

1.  `sudo apt-get install postfix`
1.  Choose "Internet site" option on menu prompt and enter settings that make
sense. We'll do the rest of the configuration manually.
1.  Put this at the end of your `/etc/postfix/main.cf` file:
        ## added by me
        virtual_alias_domains = yourfirstdomain.com, yourseconddomain.com
        virtual_alias_maps = hash:/etc/postfix/virtual
        inet_protocols = all
1.  Create file `/etc/postfix/virtual` and add lines to it like the following:
        name@yourfirstdomain.com        name@freewebmailprovider.com
        name@yourseconddomain.com       name@freewebmailprovider.com
... this will cause any main for name@yourfirstdomain.com and 
name@yourseconddomain.com to be forwarded to name@freewebmailprovider.com
1.  Make sure you generate the "hash" or ".db" file for `virtual` by doing:
`sudo postmap hash:/etc/postfix/virtual`
1.  Reload `postfix` config with `sudo /etc/init.d/postfix reload`, or
start `postfix` in case it is not running already: `sudo /etc/init.d/postfix start`
1.  Make sure that port 25 (SMTP) is open on your server's ACL/firewall!
1.  Done!

Troubleshooting
----

Pretty much anything that might have gone wrong with your `postfix` configuration
will be logged to either one of these upon `start` or `reload` or the package:

    /var/log/mail.err
    /var/log/mail.log

Conclusion
----

This comes very handy for leveraging your ability to support multiple email
addresses on the domains that you control while letting you not worry about
setting up an actual client, and using existing free webmail accounts for
receiving your email.

This approach covers the *receiving* part very well, but I've made no effort
to support sending via your server/hosting, and it's unlikely to work out of
the box without additional configuration. My suggestion is to not try to use
your server for sending email, and to use your webmail or similar client
with a "Reply-To" header if you want. I don't really care too much since I
just want the receiving part to work, and later on I can reply to emails that
matter to me using my real email address.
