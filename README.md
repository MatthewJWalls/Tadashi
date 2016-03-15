# Tadashi

Tadashi is a set of review/drill apps the Japanese language.

This app is written in Angular/Python Flask and comes pre-packaged for deployment to heroku.

## Installation

Requires Python 2.7+. To install dependencies, use pip:

    pip install -r requirements.txt

## Running the App

To run the development server, just run the main script:

    ./tadashi.py

And go to your local port 5000

## Running the tests

The app comes with a karma.conf.js which allows you to run the tests with the Karma test runner:

    karma run karma.conf.js

## Dependency management

Javascript written as CommonJS modules, user browserify to regenerate static/js/app.min.js

    browserify static/js/app.js -o static/js/app.min.js

