#!/usr/bin/env bash
# setting badgersden to run on startup at port 80
(crontab -l ; echo "@reboot cd /home/pi/workspaces/badgersden/ && sudo ./run.sh 80 > /var/log/badgersden_cron.log")| crontab -
