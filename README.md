?# Suicide Study Application


I completed this project during my time at the [Columbia Engineering Data Analytics Bootcamp](https://bootcamp.cvn.columbia.edu/data/nyc/landing/?s=Google-Brand&pkw=%2Bdata%20%2Banalytics%20%2Bcolumbia&pcrid=392444639754&pmt=b&utm_source=google&utm_medium=cpc&utm_campaign=%5BS%5D_GRD_Data_Brand_ALL_NYC_BMM_New&utm_term=%2Bdata%20%2Banalytics%20%2Bcolumbia&utm_content=392444639754&s=google&k=%2Bdata%20%2Banalytics%20%2Bcolumbia&gclid=Cj0KCQiA2b7uBRDsARIsAEE9XpFH-2wU0-_7jtxCV_PCkGBR0prlyKtvpF2-nAWU1tO4oYci5h1QStsaAsg5EALw_wcB&gclsrc=aw.ds) located in New York, NY.


#### -- Project Status: [Completed]

## Project Description

This study intends to identify who is at risk through descriptive analysis, data visualization and to predict suicide rates through machine learning models and deep learning

The final project include the following: 

## Back-End Development

##### Extract

### Dataset

This dataset “Suicide Rates Overview From 1985 to 2016” was collected from Kaggle. It comprises of suicide rates for 101 countries in all 6 continents around the world from 1985 to 2016. The dataset also provides these variables: year, gross domestic project (GDP), GDP per capita, Human Development Index (HDI) for year, suicide rates per 100k population, generation, age, sex, and population.

As the main dataset does not list the continents, Techslides' application programming interface (API) was used to provide the countries’ continent and flag photos. Antarctica is not included in this study because it is currently uninhabited.

### Variables

- Country: 101.
- Year: 1985 - 2016.
- Sex: Male - Female.
- Age: 5-14 years, 15-24 years, 25-34 years, 35-54 years, 55-74 years, 75+ years.
- GDP per Capita: The measurement for a country's standard of living for each individual based on its economy and its population.
- GDP per Year The measurement of a country’s economic production every year.
- Generation Z, Millenials, G.I., X, Silent, Boomers.
- Human Development Index (HDI): The overall measurement of a country’s standard of living that accounts for litteracy, gdp and life expectency.
- Population: The number of people who reside in a country every year.
- Continents: Africa, Asia, Australia, Europe, North American and South America. Antarctica was not included in this study.

#### Transform

## Data Cleaning

Using Pandas, the dataset was merged with the API. The unwanted columns and empty cells were dropped. The latitude and longitude from the API were turned into numbers.

#### Load 

#### Database

The transformed dataset was then loaded to a local Postgres database.

## Front-End Development

The front end was created using Bootstrap and W3 school templates. The final front-end was achieved by compiling various sections of those templates. The HTML and CSS were modified to include the appropriate text and graphs.

The graphs were created using the JavaScript library, Data Driven Documents D3. The interactivity was achieved using event listeners, HTML buttons and dropdowns.

## Data Analysis

The data analysis was conducted using stats and stats.py from Python. The function used were linear regression, one-way ANOVA, and Independent T-test.

## Machine Learning

* Linear Regression 
* Decision Tree Regression
* Support Vector Machine Regression 
* Random Forest Regression 


## Methods Used
* Data Visualization
* Data Exploration
* Database 
* Back-End Development 
* Front-End Development
* Server
* ETL



## Technologies
* Python (Jupyter Notebook, BeautifulSoup, Pandas, Requests/Splinter).
* HTML
* MongoDB (pymongo)

## Needed for this project 
* Procfile
* requirements.txt
* run.sh
* runtime.txt
* _init_.py

## Getting Started

1. Clone this repo (for help see this [tutorial](https://help.github.com/articles/cloning-a-repository/)).
2. Find the [Create_Tables_db.sql](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/blob/master/SuicideStudyApp/db/Create_Tables_db.sql) to create tables SQL.
3. Find HTML pages in the [templates](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/tree/master/SuicideStudyApp/templates).
4. Find CSS pages in the [css](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/tree/master/SuicideStudyApp/static/css) folder.
5. Find the JS pages in [js](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/tree/master/SuicideStudyApp/static/js).
6. Find the [application](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/blob/master/SuicideStudyApp/suicideapp.py) in the main folder.
7. Find the [Machine Learning Notebooks](https://github.com/CarolineDelva/Suicide_Rates_Overview_Team_Project/tree/master/SuicideStudyApp/Machine%20Learning%20Notebooks) in the main folder.


