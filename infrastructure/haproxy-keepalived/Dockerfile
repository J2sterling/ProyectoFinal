FROM haproxy:2.8-alpine

USER root

RUN apk add --no-cache keepalived iputils curl net-tools

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY keepalived.conf /etc/keepalived/keepalived.conf
COPY check_haproxy.sh /usr/bin/check_haproxy.sh
COPY master.sh /etc/keepalived/master.sh
COPY backup.sh /etc/keepalived/backup.sh
COPY start.sh /usr/bin/start.sh

RUN chmod +x /usr/bin/check_haproxy.sh /usr/bin/start.sh /etc/keepalived/master.sh /etc/keepalived/backup.sh

# Create necessary directories
RUN mkdir -p /var/run/haproxy

EXPOSE 80 8080

CMD ["/usr/bin/start.sh"]
