#!/usr/bin/env bash
while ! avahi-daemon -c; do echo "Waiting for avahi..."; sleep 3; done; echo "Avahi on!";
nohup node index.js > badgersden.log &
