DROP TABLE IF EXISTS participants;

CREATE TABLE participants (
  id         serial,
  event_id   int,
  user_id    int,
  start_date text,
  end_date   text,
  note       text,
  paid       int,
  prize      int,
  note       text
);