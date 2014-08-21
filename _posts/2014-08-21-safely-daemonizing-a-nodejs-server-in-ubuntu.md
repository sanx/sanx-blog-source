Safely *daemonizing* a NodeJS server in Ubuntu
====

We don't want to run the NodeJS service as root just to be able to bind to
port 80, given all the risks that doing this would bring.

Use `iptables` to forward requests coming in on port 80 over to port 3000
----

`sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`
`sudo ip6tables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`

... this will work until you restart the server.

Use `iptables-persistent` to restore the `iptables` routes automatically on every reboot
----

`sudo apt-get install iptables-persistent`

... if you did this after the `iptables` command above it, just answer *yes* and *yes*
to save your forwarding rules in package `iptables-persistent` post-install script.

If, for some reason, your routes were not quite working the way you wanted them to
before you installed package `iptables-persistent`, go ahead and tweak them to your
liking, and then run the following commands to save them:

`sudo iptables-save > /etc/iptables/rules.v4`
`sudo ip6tables-save > /etc/iptables/rules.v6`

That's it! `iptables-persistent` is a service that should load `/etc/iptables/rules.v{4,6}`
into `iptables` on system startup!

Use `upstart` to "daemonize" your `NodeJS` service
----

cat /home/ubuntu/myservice/server.sh:

    #!/bin/bash

    SCRIPT_PATH=$(dirname `which $0`)

    node --harmony $SCRIPT_PATH/index.js

cat /etc/init/myservice.conf:

    # cat /etc/init/myservice.conf
    # http://upstart.ubuntu.com/wiki/Stanzas

    description "My Service"
    author      "github.com/sanx"

    stop on shutdown
    respawn
    respawn limit 20 5

    # Max open files are @ 1024 by default. Bit few.
    limit nofile 32768 32768

    script
      set -e
      mkfifo /tmp/myservice-log-fifo
      ( logger -t myservice </tmp/myservice-log-fifo & )
      exec >/tmp/myservice-log-fifo
      rm /tmp/myservice-log-fifo
      exec sudo -u www-data MASTERKEY=`echo hi` /home/ubuntu/myservice/server.sh 2>&1
    end script

    post-start script
       echo 'My Service Just started'
    end script

That's it! Now, you can start your service now by calling: `start myservice`, stop
it with `stop myservice`, and it will run automatically on system startup!
