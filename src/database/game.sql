DROP TABLE IF EXISTS game;

CREATE TABLE game (
  id               serial,
  game_id          text,
  event_id         int,
  max_participants int,
  min_buyin        int,
  max_buyin        int,
  terms            text
);