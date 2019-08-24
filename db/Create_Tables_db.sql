Drop suicide_rates_db
CREATE TABLE suicide_rates_db(
  ID INT primary key,	
   country VARCHAR,
   year INT,
   sex VARCHAR ,
	age VARCHAR,
	suicides_no INT,
	population BIGINT,
	suicideshundredk decimal,
	country_year VARCHAR,
	HDIforyear decimal,
	gdp_for_year BIGINT,
	gdp_per_capita INT,
	generation VARCHAR
	);