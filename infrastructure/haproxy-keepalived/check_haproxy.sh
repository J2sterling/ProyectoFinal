#!/bin/sh

# Check if HAProxy is running
if ! pgrep haproxy > /dev/null; then
    exit 1
fi

# Check if HAProxy is responding on stats port
if ! curl -f http://localhost:8080/stats > /dev/null 2>&1; then
    exit 1
fi

exit 0
