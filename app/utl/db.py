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
# WRAPPER FUNCTIONS

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
# DATABASE INTERACTION FUNCTIONS

# Initialize the database with the necessary maps table
@_connects
def init(db=None):
    # Create the maps table to store map data
    db.execute('''
                CREATE TABLE IF NOT EXISTS maps(
                    id INTEGER UNIQUE PRIMARY KEY,
                    height INTEGER,
                    width INTEGER,
                    data TEXT
               );''')
    db.commit()


# Retrieve the map data for a given map found by name
@_connects
def db_get_map(id, db=None):
    results = db.execute('''
                        SELECT * 
                        FROM maps 
                        WHERE id=?;
                        ''', 
                        (id,))
    return results.fetchone()


# Retrieve a random map's data
@_connects
def db_get_rand_map(db=None):
    results = db.execute('''
                        SELECT * 
                        FROM maps;
                        ''')
    results = [i for i in results]
    return random.choice(results)


# Add a map to the database
@_connects
def db_add_map(id, data, height=DEFAULT_HEIGHT, width=DEFAULT_WIDTH, db=None):
    db.execute('''
                INSERT INTO maps 
                VALUES(?, ?, ?, ?);
                ''',
                (None, height, width, data))
    db.commit()

#=============================================================================
# DATA FORMATTING FUNCTIONS

# Convert string map data into 2d array
def data_convert(height, width, data):
    map_array = list()
    for i in range(height):
        row = data[(i*width):(i*(width+1)+1)]
        row = [int(i) for i in list(row)]

        map_array.append(row)
    return map_array


# Return all formatted map information as dictionary
def get_map(id=None):
    if (id):
        db_result = db_get_map(id)
    else:
        db_result = db_get_rand_map()
    
    map_dict = {
        'name': 'level' + str(db_result[0]),
        'height': db_result[1],
        'width': db_result[2],
        'data': data_convert(db_result[1], db_result[2], db_result[3])
    }
    return map_dict