FROM ruby:2.3.1

EXPOSE 3000

RUN apt-get update && apt-get install -qq -y build-essential nodejs libpq-dev postgresql-client-9.5 --fix-missing --no-install-recommends

RUN gem install bundler --no-rdoc --no-ri

# Add application source to /app
ADD . /app
RUN chown -R nobody:nogroup /app  
USER nobody

WORKDIR /app

RUN bundle install --binstubs --without development test