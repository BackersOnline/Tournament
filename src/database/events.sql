DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id          serial,
  organizer_id int,
  title        text,
  public       boolean,
  start_date   text,
  end_date     text,
  address      text,
  location     text,
  terms        text
);