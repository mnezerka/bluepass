FROM ubuntu:14.04

# Update the repository and install necessary tools
RUN apt-get update && apt-get install -y \
     apache2 \
     monit \
     python \
     python-pip

RUN pip install flask Flask-JWT 

# Expose ports
EXPOSE 80
EXPOSE 2812
COPY ./docker/monitrc /etc/monit/monitrc
RUN chmod 0700 /etc/monit/monitrc

VOLUME ["/var/www"]

COPY ./docker/apache2.conf /etc/apache2/

ENTRYPOINT exec monit -I
