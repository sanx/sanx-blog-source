---
layout: post
title: PHP Composer
---

PHP Composer dependency manager. I just found out about it. All I have to say is: "Wow!".

I regularly go back to the [Doctrine Project's website](http://www.doctrine-project.org/) to review their fabulous ORM's documentation and to find out if there are any new versions.

Around a week or two ago I went back to Doctrine's website and something caught my eye: they were no longer recommending downloading the tarballs/zip files, installing with PEAR, or checking out code directly from their source control repo. They were recommending people use what seemed to me like a new, non-standard way to install modules on PHP. I didn't see the need to upgrade then, so I didn't bother downloading the new versions either via the traditional methods that I was more familiar with or via this crazy new way.

It was only 2 days ago, while I was doing the usual Friday afternoon web surfing (and after I had just realized the existence of something called PHAR archive packages for PHP, kind of like Java JARs but for PHP) that I went back to Doctrine's site and I decided to follow the link to the [Composer distribution of the Doctrine ORM](https://packagist.org/packages/doctrine/orm). I was welcomed by a neat little page that looks everything like what [PHP.net's PEAR site](http://pear.php.net) should look like.

Upon some browsing around the pages for the package that I was interested in, as well as others, I fell in love with [Packagist](http://www.packagist.org), the packaged modules repository that [Composer](http://getcomposer.org/) uses by default.

So, basically, what these guys have done is to bring Web 2.0 (shouldn't that term be way past its expiration date now that we've been using it for over 6 years?) toolset cleanness and openness to the PHP world, something that will hopefully help relive a lot of abandoned projects (license permitting, Composer's compatibility with Git, Mercurial and other DVCMS makes it easy for developers to continue working where somebody else left off, maybe a while ago!).

I expect to make a few more posts on this topic in the near future as I experiment with these new tools.
