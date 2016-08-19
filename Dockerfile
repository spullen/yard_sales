FROM ruby:2.3.1

EXPOSE 3000

RUN apt-get update && apt-get install -qq -y build-essential nodejs libpq-dev postgresql-client --fix-missing --no-install-recommends

RUN gem install rake --no-rdoc --no-ri
RUN gem install bundler --no-rdoc --no-ri

# Add application source to /app
ADD . /app

WORKDIR /app

RUN bundle install --binstubs --without development test