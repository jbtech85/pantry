CREATE TABLE account (
  account_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  default_household_fk INTEGER,
  date_created TIMESTAMP DEFAULT now(),
  last_login TIMESTAMP
);

CREATE TABLE household (
  household_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR (255),
  date_created TIMESTAMP DEFAULT now()
);

INSERT INTO household (name, description)
  VALUES ('authed','an indicator for authed users who do not have a default household');

CREATE TABLE account_household (
  user_household_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  account_fk INTEGER NOT NULL,
  household_fk INTEGER NOT NULL,
  is_admin BOOLEAN,
  date_created TIMESTAMP DEFAULT now()
);

CREATE TABLE item (
  item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  variation VARCHAR(150),
  note VARCHAR(255),
  isPantry BOOLEAN,
  isGrocery BOOLEAN,
  household_fk INTEGER NOT NULL,
  date_created TIMESTAMP DEFAULT now()
);

