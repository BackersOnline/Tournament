DROP TABLE IF EXISTS participants;

CREATE TABLE participants (
  id         serial,
  event_id   int,
  user_id    int,
  start_time bigint,
  start_date text,
  end_date   text,
  registered boolean,
  paid       int,
  prize      int,
  note       text
);