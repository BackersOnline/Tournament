DROP TABLE IF EXISTS tournaments;

CREATE TABLE tournaments (
  id               serial,
  tournament_id    text,
  event_id         int,
  max_participants int,
  min_participants int,
  buyin            decimal(18, 9),
  guarantee        int,
  terms            text
);