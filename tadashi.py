#!/usr/bin/env python

import os
from flask import *

# flask configuration
DEBUG = False
SECRET_KEY = 'dontcare'
USERNAME = 'dontcare'
PASSWORD = 'dontcare'

# app setup
app = Flask(__name__)
app.config.from_object(__name__)

# routes
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template('index.html')

# startup
if __name__ == "__main__":
    app.run(host="0.0.0.0")
