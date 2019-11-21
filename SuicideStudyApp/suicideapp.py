
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


@app.route("/index.html")
def main():
    return render_template("index.html")

@app.route("/contentpage.html")
def contentpage():
    return render_template("contentpage.html")


@app.route("/aboutmepage.html")
def aboutmepage():
    return render_template("aboutmepage.html")




@app.route("/age.html")
def agepage():
    return render_template("age.html")

@app.route("/gender.html")
def genderpage():
    return render_template("gender.html") 

@app.route("/generation.html")
def generationpage():
    return render_template("generation.html")

@app.route("/GDP.html")
def GDP():
    return render_template("GDP.html")


@app.route("/data.html")
def data2():
    return render_template("data.html")


@app.route("/population.html")
def populationpage():
    return render_template("population.html")


@app.route('/year.html')
def yearpage():
    return render_template("year.html")

@app.route('/linearregression.html')
def linearregressionpage():
    return render_template("linearregression.html")
@app.route('/supportvectormachine.html')
def supportvectormachienepage():
    return render_template("supportvectormachine.html")



@app.route('/deeplearning.html')
def deeplearningpage():
    return render_template("deeplearning.html")

@app.route('/desiciontree.html')
def decisiontreenpage():
    return render_template("desiciontree.html")

@app.route('/randomforest.html')
def randomforestpage():
    return render_template("randomforest.html")

@app.route('/example2.html')
def expage():
    return render_template("example2.html")




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






@app.route("/suicideratesdata2")
def suicidedata2():

    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
    }



    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicide_rates_db', engine)
    df_suicide_rates_df = df_suicide_rates_df.to_json(orient='records', index=True)

    return df_suicide_rates_df 


@app.route('/agedata')
def agedatapage():
    

    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
    }



    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicide_rates_db', engine)
    df_suicide_rates_df.head()



    continent_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    continent_df = pd.read_json(json.dumps(continent_coordinates.json()), orient= 'list')
    continent_df["ContinentName"] = continent_df["ContinentName"].str.replace(" ", "")
    continent_df

    combined_data =df_suicide_rates_df.merge(continent_df, left_on ="country", right_on='CountryName')
    combined_data


    combined_data = combined_data[['ContinentName', 'age', 'country', 'year', 'suicides_no', 'population', 'CapitalLatitude', 'CapitalLongitude']]
    combined_data.head()



    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()
    combined_data


    continent_pic_file = pd.read_csv("Data/Continents_Images.csv")
    continent_pic_file

    combined_data =combined_data.merge(continent_pic_file, left_on ="ContinentName", right_on='Continent')
    combined_data


    combined_data_by_continent = combined_data.groupby(['ContinentName', 'age']).agg({'suicides_no' : 'mean'})
    combined_data_by_continent = combined_data_by_continent.reset_index()
    combined_data_by_continent2 = combined_data_by_continent.round(0)
    combined_data_by_continent2

    ageafrica = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'Africa']
    ageafrica = ageafrica.rename(columns={'suicides_no': 'suicides_no_africa'})
    ageafrica = ageafrica[['age', 'suicides_no_africa']]
    ageafrica

    agenorthamerica = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'NorthAmerica']
    agenorthamerica = agenorthamerica.rename(columns={'suicides_no': 'suicides_no_northamerica'})
    agenorthamerica = agenorthamerica[['age', 'suicides_no_northamerica']]

    agenorthamerica


    agesouthamerica = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'SouthAmerica']
    agesouthamerica = agesouthamerica.rename(columns={'suicides_no': 'suicides_no_southamerica'})
    agesouthamerica = agesouthamerica[['age', 'suicides_no_southamerica']]

    agesouthamerica


    ageaustralia = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'Australia']
    ageaustralia = ageaustralia.rename(columns={'suicides_no': 'suicides_no_australia'})
    ageaustralia = ageaustralia[['age', 'suicides_no_australia']]

    ageaustralia

    ageeurope = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'Europe']
    ageeurope =ageeurope.rename(columns={'suicides_no': 'suicides_no_europe'})
    ageeurope = ageeurope[['age', 'suicides_no_europe']]
    ageeurope

    ageasia = combined_data_by_continent2.loc[combined_data_by_continent2['ContinentName'] == 'Asia']
    ageasia =ageasia.rename(columns={'suicides_no': 'suicides_no_asia'})
    ageasia = ageasia[['age', 'suicides_no_asia']]

    ageasia

    agedata = ageasia.merge(ageafrica, on='age')
    agedata = agedata.merge(ageaustralia, on='age')
    agedata = agedata.merge(agenorthamerica, on='age')
    agedata = agedata.merge(agesouthamerica, on='age')
    agedata = agedata.merge(ageeurope, on='age')
    agedata

   
    agedata = agedata.to_json(orient='records', index=True)

    return agedata



@app.route('/yeardata')
def yeardatapage():
    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
}

    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicides_rates_db', con=engine)
    year_suicide_rates_df = df_suicide_rates_df.groupby(["year", 'country']).agg({"suicides_no": "mean"})
    year_suicide_rates_df = year_suicide_rates_df.sort_values(by='suicides_no', ascending=False)
    year_suicide_rates_df = year_suicide_rates_df.reset_index()
    year_suicide_rates_df = year_suicide_rates_df.to_json(orient='records', index=True)
    return year_suicide_rates_df



@app.route('/generationdata')
def generationdatapage():
    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
}

    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicide_rates_db', con=engine)
    generation_suicide_rates_df = df_suicide_rates_df.groupby(["generation", "country"]).agg({"suicides_no": "mean"})
    generation_suicide_rates_df = generation_suicide_rates_df.sort_values(by='suicides_no', ascending=True)
    generation_suicide_rates_df = generation_suicide_rates_df.reset_index()
    generation_suicide_rates_df = generation_suicide_rates_df.to_json(orient='records', index=True)
    return generation_suicide_rates_df

@app.route('/countrycoordinates')
def countrycoordinates():
    countries_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    return jsonify({"coord": countries_coordinates.json()})



@app.route("/suicidedatabycontinentjpg")
def continentsuicidedatajpg():
    
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

    continent_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    continent_df = pd.read_json(json.dumps(continent_coordinates.json()), orient= 'list')
    continent_df["ContinentName"] = continent_df["ContinentName"].str.replace(" ", "")
    continent_df

    combined_data =df_suicide_rates_df.merge(continent_df, left_on ="country", right_on='CountryName')
    combined_data


    combined_data = combined_data[['ContinentName', 'sex', 'suicides_no', 'CapitalLatitude', 'CapitalLongitude']]
    combined_data



    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()
    combined_data


    continent_pic_file = pd.read_csv("Data/Continents_Images.csv")
    continent_pic_file

    combined_data =combined_data.merge(continent_pic_file, left_on ="ContinentName", right_on='Continent')
    combined_data


        

    combined_data_by_continent = combined_data.groupby(['ContinentName', 'sex', "ImageURL"]).agg({'suicides_no' : 'sum', 'CapitalLongitude': 'mean', 'CapitalLatitude': 'mean'})


    combined_data_by_continent = combined_data_by_continent.reset_index()    
    suicide_by_continent = combined_data_by_continent.to_json(orient='records', index=True)
    suicide_by_continent      
    

    return suicide_by_continent
      

@app.route("/suicidedatabycountryjpg")
def suicidedatajpg():
    
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
    flag_file = pd.read_csv("Data/Country_Flags.csv")
    flag_file["Country"] = flag_file["Country"].str.replace(" ", "")
    combined_data =df_suicide_rates_df.merge(countries_df, left_on ="country", right_on='CountryName')
    combined_data2 = combined_data.merge(flag_file, left_on='country', right_on='Country')
    combined_data = combined_data2[['Country', 'sex', 'suicides_no', 'CapitalLatitude', 'CapitalLongitude', 'ContinentName', "Images File Name", "ImageURL"]]
    combined_data
    combined_data.to_json()
    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()
    combined_data_by_country = combined_data.groupby(['Country', 'sex', "Images File Name", "ImageURL"]).agg({'suicides_no' : 'sum', 'CapitalLongitude': 'mean', 'CapitalLatitude': 'mean'})
    combined_data_by_country = combined_data_by_country.reset_index()    
    suicide_by_country = combined_data_by_country.to_json(orient='records', index=True)
    suicide_by_country
    return suicide_by_country






@app.route("/suicidedatabycountrygdpjpg")
def suicidedatagdp():
    
    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
    }



    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicide_rates_db', engine)
    df_suicide_rates_df.head()



    continent_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    continent_df = pd.read_json(json.dumps(continent_coordinates.json()), orient= 'list')
    continent_df["ContinentName"] = continent_df["ContinentName"].str.replace(" ", "")
    continent_df

    combined_data =df_suicide_rates_df.merge(continent_df, left_on ="country", right_on='CountryName')
    combined_data


    combined_data = combined_data[['ContinentName', 'country', 'suicides_no', 'gdp_per_capita', 'CapitalLatitude', 'CapitalLongitude']]
    combined_data.head()



    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()
    combined_data


    continent_pic_file = pd.read_csv("Data/Continents_Images.csv")
    continent_pic_file

    combined_data =combined_data.merge(continent_pic_file, left_on ="ContinentName", right_on='Continent')
    combined_data


    combined_data_by_continent = combined_data.groupby(['ContinentName', 'country', 'CapitalLatitude', 'CapitalLongitude']).agg({'suicides_no' : 'mean', 'gdp_per_capita': 'mean'})
    combined_data_by_continent
    combined_data_by_continent = combined_data_by_continent.round(0)
    combined_data_by_continent
    combined_data_by_continent = combined_data_by_continent.reset_index()    
    gdpandsuicide = combined_data_by_continent.to_json(orient='records', index=True)
    gdpandsuicide

    return gdpandsuicide



@app.route('/populationdata')
def populationdatapage():
    
    POSTGRES = {
    'user': 'postgres',
    'pw': api_key,
    'db': 'suicide_rates_overview_db',
    'host': 'localhost',
    'port': '5432',
    }



    engine = create_engine('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s'% POSTGRES)
    df_suicide_rates_df = pd.read_sql('select * from suicide_rates_db', engine)
    df_suicide_rates_df.head()



    continent_coordinates = requests.get("http://techslides.com/demos/country-capitals.json")
    continent_df = pd.read_json(json.dumps(continent_coordinates.json()), orient= 'list')
    continent_df["ContinentName"] = continent_df["ContinentName"].str.replace(" ", "")
    continent_df

    combined_data =df_suicide_rates_df.merge(continent_df, left_on ="country", right_on='CountryName')
    combined_data


    combined_data = combined_data[['ContinentName', 'country', 'year', 'suicides_no', 'population', 'CapitalLatitude', 'CapitalLongitude']]
    combined_data.head()



    combined_data['suicides_no'] = pd.to_numeric(combined_data['suicides_no'], errors='coerce')
    combined_data['CapitalLatitude'] = pd.to_numeric(combined_data['CapitalLatitude'], errors='coerce')
    combined_data['CapitalLongitude'] = pd.to_numeric(combined_data['CapitalLongitude'], errors='coerce')
    combined_data = combined_data.dropna()
    combined_data


    continent_pic_file = pd.read_csv("Data/Continents_Images.csv")
    continent_pic_file

    combined_data =combined_data.merge(continent_pic_file, left_on ="ContinentName", right_on='Continent')
    combined_data


    combined_data_by_continent = combined_data.groupby(['ContinentName', 'country']).agg({'suicides_no' : 'mean', 'population': 'mean'})
    combined_data_by_continent
    combined_data_by_continent = combined_data_by_continent.round(0)

    combined_data_by_continent = combined_data_by_continent.reset_index()    
    populationandsuicide = combined_data_by_continent.to_json(orient='records', index=True)
    populationandsuicide

    return populationandsuicide
  




if __name__ == '__main__':
    app.run()