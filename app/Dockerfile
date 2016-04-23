FROM ubuntu:14.04


# Update the repository and install necessary tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    monit

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

RUN apt-get install -y nodejs

RUN sudo npm update -g npm

RUN sudo npm install -g gulp

EXPOSE 2812
COPY ./docker/monitrc /etc/monit/monitrc
RUN chmod 0700 /etc/monit/monitrc

ENTRYPOINT exec monit -I
