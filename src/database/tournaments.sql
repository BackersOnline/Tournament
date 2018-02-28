DROP TABLE IF EXISTS tournament;

CREATE TABLE tournament (
  id               serial,
  event_id         int,
  max_participants int,
  min_participants int,
  buyin            int,
  guarantee        int,
  terms            text
);