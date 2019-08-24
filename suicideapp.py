
#from __future__ import print_function
from flask import Flask
# from config import api_key 

import pandas as pd
import numpy as numpy

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine 

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

import requests 
import json

from config import api_key
from config import google_api_key

app = Flask(__name__)


POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
}


app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
db = SQLAlchemy(app)
db.init_app(app)

print(db.engine)


Base = automap_base()
Base.prepare(db.engine, reflect=True)

# import pdb
# pdb.set_trace()
suicide_data_class = Base.classes.suicide_rates_db
#google_api_class = Base.classes.google_api
print(dir(Base.classes))


@app.route("/")
def main():
    return render_template("gender.html")


@app.route("/suicideratesdata")
def suicidedata():

    sel = [
        suicide_data_class.id,
        suicide_data_class.country,
        suicide_data_class.year,
        suicide_data_class.sex,
        suicide_data_class.age,
        suicide_data_class.suicides_no,
        suicide_data_class.population,
        suicide_data_class.suicideshundredk,
        suicide_data_class.country_year,
        suicide_data_class.hdiforyear,
        suicide_data_class.gdp_for_year,
        suicide_data_class.gdp_per_capita,
        suicide_data_class.generation,
    ]

    results = db.session.query(*sel).all()
    
    #Creating a dictionary for suicide_data_class
    #suicide_data_dictionary = {}
    arr=[]
    for result in results:
        suicide_data_dictionary = {}
        suicide_data_dictionary["id"] = result[0]
        suicide_data_dictionary["country"] = result[1]
        suicide_data_dictionary ["year"] = result[2]
        suicide_data_dictionary ["sex"] = result[3]
        suicide_data_dictionary ["age"] = result[4]
        suicide_data_dictionary ["suicides_no"] =str(result[5])
        suicide_data_dictionary ["population"]= str(result[6])
        suicide_data_dictionary ["suicidehundredk"]= str(result[7])
        suicide_data_dictionary ["county_year"]=result[8]
        suicide_data_dictionary ["hdiforyear"] = str(result[9])
        suicide_data_dictionary ["gdp_for_year"] = str(result[10])
        suicide_data_dictionary ["gdp_per_capita"] =str(result[11])
        suicide_data_dictionary ["generation"] = result[12]
        arr.append( suicide_data_dictionary)
    print(suicide_data_dictionary)
    return jsonify(arr)

@app.route('/countrycoordinates')
def countrycoordinates():
    countries_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    return jsonify({"coord": countries_coordinates.json()})



       

@app.route('/joined_data')
def joined_data_by_country():
    return jsonify


@app.route('/joined_data')
def joined_data_by_country(info2):
   google_api_stmt = db.session.query(google_api_class).statement
    google_api_df = pd.read_sql_query(google_api_stmt, db.session.bind)

    suicide_data_stmt = db.session.query(suicide_data_class).statement
    suicide_data_df = pd.read_sql_query(suicide_data_stmt, db.session.bind)

    df_suicide_rates_by_country = df_suicide_df[['country', 'sex','suicides_no']].groupby("country").agg({"suicides_no" : "mean"})
    df_suicide_rates_by_country = pd.merge(google_api_df, suicide_data_df, how=outer, left_index=True, right_index=True)
    
    joined_data_df = suicide_data_df.groupby([]) 

    joined_data = {
        "country": joined_data_df.country.values.tolist(),
        "sex" : joined_data_df.sex.values.tolist(),
        "suicides_no" : joined_data_df.suicides_no.tolist(),           

     }
    return jsonify(joined_data)

if __name__ == '__main__':
    app.run()