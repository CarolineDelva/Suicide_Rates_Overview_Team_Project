
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
    return render_template("index.html")


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


@app.route('/suicidedatabycontinent')
def suicide_by_continent():    
    POSTGRES = {
        'user': 'postgres',
        'pw': api_key,
        'db': 'suicide_rates_overview_db',
        'host': 'localhost',
        'port': '5432',
    }

    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicides_rates_db', engine)
    df_suicide_rates_df

    countries_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")


    countries_df = pd.read_json(json.dumps(countries_coordinates.json()), orient= 'list')

    combined_data =df_suicide_rates_df.merge(countries_df, left_on ="country", right_on='CountryName')


    combined_data = combined_data[['country', 'sex', 'suicides_no', 'CapitalLatitude', 'CapitalLongitude', 'ContinentName']]
    combined_data.head()

    combined_data.to_json()

    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()

    combined_data_by_continent = combined_data.groupby(['ContinentName', 'sex']).agg({'suicides_no' : 'sum', 'CapitalLongitude': 'mean', 'CapitalLatitude': 'mean'})
    suicide_by_continent = combined_data_by_continent.to_json()

    return suicide_by_continent


@app.route('/suicidedatabycountry')
def suicide_by_country():
        
    POSTGRES = {
        'user': 'postgres',
        'pw': api_key,
        'db': 'suicide_rates_overview_db',
        'host': 'localhost',
        'port': '5432',
    }



    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicides_rates_db', engine)
    df_suicide_rates_df

    countries_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")


    countries_df = pd.read_json(json.dumps(countries_coordinates.json()), orient= 'list')

    combined_data =df_suicide_rates_df.merge(countries_df, left_on ="country", right_on='CountryName')


    combined_data = combined_data[['country', 'sex', 'suicides_no', 'CapitalLatitude', 'CapitalLongitude', 'ContinentName']]
    combined_data.head()

    combined_data.to_json()

    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()

    

    combined_data_by_country = combined_data.groupby(['country', 'sex']).agg({'suicides_no' : 'sum', 'CapitalLongitude': 'mean', 'CapitalLatitude': 'mean'})
    suicide_by_country = combined_data_by_country.to_json()
    return  suicide_by_country
      





if __name__ == '__main__':
    app.run()