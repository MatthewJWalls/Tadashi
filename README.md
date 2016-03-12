# WaniKani Quiz

WaniKani Quiz is a stand-alone review/drill app for the popular WaniKani Kanji learning website.
This app bypasses the SRS system and lets you review all WaniKani content that you have unlocked
without restriction.

This app is written in Angular/Python Flask and comes pre-packaged for deployment to heroku.

## Installation

Requires Python 2.7+. To install dependencies, use pip:

    pip install -r requirements.txt


## Running the App

To run the development server, just run the main script:

    ./wanikani-quiz.py

And go to your local port 5000

## Running the tests

The app comes with a karma.conf.js which allows you to run the tests with the Karma test runner:

    karma run karma.conf.js

