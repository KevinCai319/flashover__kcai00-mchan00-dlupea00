# Team flashover -- Kevin Cai, Matthew Chan & David Lupea
# SoftDev pd9
# P#05 -- Fin
# 2020-06-01

import os
import random

from flask import Flask, render_template, request, redirect, url_for, session, flash

from utl import db


app = Flask(__name__)
# creates secret key for sessions
app.secret_key = os.urandom(32)


@app.route("/")
def root():
    return render_template('game.html')

@app.route("/map")
def get_map():
    return db.get_map()


if __name__ == "__main__":
    app.debug = True
    app.run()
