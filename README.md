# Yard Sale Finder

Simple app to play around with:

* React
* webpack
* async google maps with React

## Future Enhancements

* Use custom async loader to load google maps instead of the library that decorates the component. This should clean things up a bit
* Complete dockerization
    * Build docker image for front end with shared docker volume
    * Add volumes for postgres and redis to persist data after docker is shutdown
    * Add nginx proxy image that fronts both the api and the static assets
* Add CAPTCHA to create listing form since there's no sessions here
* Add email notification subscription (enter email + radius to location, run daily check to see if there are any for the that criteria)
