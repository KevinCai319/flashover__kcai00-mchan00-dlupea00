# Team flashover -- Kevin Cai, Matthew Chan & David Lupea
# SoftDev pd9
# P#05 -- Fin
# 2020-06-01

import sqlite3
import random

_DB_FILE = 'tanks.db'

DEFAULT_HEIGHT = 15
DEFAULT_WIDTH = 30

#=============================================================================
# WRAPPER FUNCTION(S)

# Connects to the database file
# Passes the connected object to the wrapped function
# Returns the wrapped function if no SQLite error, otherwise returns False
def _connects(db_func):
    def establish_connection(*args, **kwargs):
        db = sqlite3.connect(_DB_FILE)
        try:
            return db_func(*args, **kwargs, db = db)
        except sqlite3.Error as error:
            print(error)
            return False
    return establish_connection
#=============================================================================


# Initialize the database with the necessary maps table
@_connects
def init(db=None):
    # Create the maps table to store map data
    db.execute('''
                CREATE TABLE IF NOT EXISTS maps(
                    name TEXT UNIQUE PRIMARY KEY, 
                    height INTEGER,
                    width INTEGER,
                    data INTEGER
               );''')
    db.commit()


# Retrieve the map data for a given map found by name
@_connects
def get_data(name, db=None):
    results = db.execute('''
                        SELECT data 
                        FROM maps 
                        WHERE name=?;
                        ''', 
                        (name,))
    return results.fetchone()


# Retrieve a random map data
@_connects
def get_rand_data(db=None):
    results = db.execute('''
                        SELECT data 
                        FROM maps;
                        ''')
    results = [i for i in results]
    return random.choice(results)


@_connects
def add_map(name, height=DEFAULT_HEIGHT, width=DEFAULT_WIDTH, data, db=None):
    db.execute('''
                INSERT INTO maps 
                VALUES(?, ?, ?, ?);
                ''',
                (name, 
                height, 
                width, 
                data
                ))
    db.commit()
