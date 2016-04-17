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

VOLUME ["/var/www"]

COPY ./docker/apache2.conf /etc/apache2/

# Set the default command to execute when creating a new container
ENTRYPOINT exec /usr/sbin/apache2ctl -DFOREGROUND
