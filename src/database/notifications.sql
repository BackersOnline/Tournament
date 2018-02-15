DROP TABLE IF EXISTS notifications;

CREATE TABLE notifications (
  id           serial,
  recipient_id int,
  sender_id    int,
  event_id     int,
  read         boolean,
  note         text
);