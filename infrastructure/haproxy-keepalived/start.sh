#!/bin/sh

# Create necessary directories
mkdir -p /var/run/haproxy

# Start HAProxy in foreground (IMPORTANTE: sin -db y en primer plano)
echo "Starting HAProxy..."
haproxy -f /usr/local/etc/haproxy/haproxy.cfg -D -p /var/run/haproxy/haproxy.pid

# Start Keepalived in foreground (esto no se ejecutará hasta que HAProxy falle)
echo "Starting Keepalived..."
keepalived -n -l -D -f /etc/keepalived/keepalived.conf
