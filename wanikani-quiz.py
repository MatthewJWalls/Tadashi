#!/usr/bin/env python

import sqlite3
import requests
import json
import os
from flask import *

# flask configuration
DEBUG = True
SECRET_KEY = 'dontcare'
USERNAME = 'dontcare'
PASSWORD = 'dontcare'

# wankikani config
API_KEY = os.environ['WANIKANI_API_KEY']

# create our little application 
app = Flask(__name__)
app.config.from_object(__name__)

@app.route("/radicals")
def radicals():
    return render_template('radicals.html')

@app.route("/kanji/<level>")
def kanji(level):
    return render_template('kanji.html')

@app.route("/vocabulary/<level>")
def vocab(level):
    return render_template('vocabulary.html')

@app.route("/api/radicals")
def api_radicals():
    res = requests.get("https://www.wanikani.com/api/user/%s/radicals" % API_KEY)
    return res.content

@app.route("/api/kanji/<level>")
def api_kanji(level):
    res = requests.get("https://www.wanikani.com/api/user/%s/kanji/%s" % (API_KEY, level))
    return res.content

@app.route("/api/vocabulary/<level>")
def api_vocab(level):
    res = requests.get("https://www.wanikani.com/api/user/%s/vocabulary/%s" % (API_KEY, level))
    return res.content

if __name__ == "__main__":
    app.run()
