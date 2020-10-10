#!/usr/bin/env bash
while ! avahi-daemon -c; do echo "Waiting for avahi..."; sleep 3; done; echo "Avahi on!";
echo PORT="$1"
echo "Log at: /var/log/badgersden.log"
PORT="$1" nohup node index.js > /var/log/badgersden.log &
echo "Badgersden started!"