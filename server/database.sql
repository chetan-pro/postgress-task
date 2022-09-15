CREATE DATABASE company;

CREATE TABLE company_data(
  company_id SERIAL PRIMARY KEY,
  cin VARCHAR(255),
  name VARCHAR(255)
);