# Tadashi

Tadashi is a set of review/drill apps for the Japanese language.

This app is written in Angular/Python Flask and comes pre-packaged for deployment to heroku.

## Installation

Requires Python 2.7+. To install dependencies, use pip:

    pip install -r requirements.txt

## Building & Running the App

To build js and run the development server:

    browserify client/src/app.js -o client/static/js/app.min.js
    ./tadashi.py

And go to your local port 5000

## Running the tests

The app comes with a karma.conf.js which allows you to run the tests with the Karma test runner:

    cd client/
    karma run karma.conf.js

