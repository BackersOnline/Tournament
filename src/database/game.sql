DROP TABLE IF EXISTS game;

CREATE TABLE game (
  id               serial,
  event_id         int,
  max_participants int,
  min_buyin        int,
  max_buyin        int,
  terms            text
);