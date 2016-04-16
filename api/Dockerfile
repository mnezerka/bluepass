FROM ubuntu:14.04

# Update the repository and install necessary tools
RUN apt-get update && apt-get install -y \
     apache2 \
     python \
     python-pip

RUN pip install bottle

# Expose ports
EXPOSE 80

#RUN e2enmod cgi

VOLUME ["/var/www"]

COPY ./docker/apache2.conf /etc/apache2/

# Set the default command to execute when creating a new container
#ADD module/supervisord.conf /etc/supervisord.conf
ENTRYPOINT exec /usr/sbin/apache2ctl -DFOREGROUND
