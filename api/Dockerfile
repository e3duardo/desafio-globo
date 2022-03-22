FROM ruby:3.0.3

LABEL maintainer="e3duardo@gmail.com"

COPY docker/install-packages /tmp/install-packages
RUN bash /tmp/install-packages

RUN mkdir -p /var/www/app/current 

ADD . /var/www/app/current
WORKDIR /var/www/app/current

RUN sudo chmod 777 Gemfile.lock
RUN bundle install

CMD bin/start
