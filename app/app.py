from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
import urllib.request as urlrequest
#import urllib.request as request
import json
import sqlite3
import os
import random
import copy
app = Flask(__name__)

# creates secret key for sessions
app.secret_key = os.urandom(32)


@app.route("/")
def root():
    return render_template('game.html')


if __name__ == "__main__":
    app.debug = True
    app.run()
