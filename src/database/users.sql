DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id              serial,
  username        text,
  suffix          text,
  first_name      text,
  last_name       text,
  middle_name     text,
  email           text,
  phone           text,
  salutation      text,
  default_address text
);