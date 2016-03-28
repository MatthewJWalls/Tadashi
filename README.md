# Tadashi

Tadashi is a set of review/drill apps for the Japanese language.

This app is written in Angular/Python Flask and comes pre-packaged for deployment to heroku.

## Installing & Building The app

Requires Python 2.7+. To install dependencies, use pip:

    pip install -r requirements.txt
    
To build js use npm:

    cd client
    npm install
    npm run make

To run the app:

    ./tadashi.py

And go to your local port 5000

## Running the tests

The app comes with a karma.conf.js which allows you to run the tests with the Karma test runner, which
can be ran from the npm tests command.

    cd client/
    npm test

