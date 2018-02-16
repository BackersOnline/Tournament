import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import * as knex from './utils/knex';

dotenv.config();
const app = express();

app.use(express.static(__dirname + '/../client/static/'));
app.use(express.static(__dirname + '/../client/static/build'));
app.use(express.static(__dirname + '/../client/static/images'));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/static/index.html'));
});

app.post('/post/user', (req, res) => {
  knex.postUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
    });
});

app.post('/post/event', (req, res) => {
  knex.postEvent(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
    });
});

app.post('/post/tournament', (req, res) => {
  knex.postTournament(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
    });
});

app.post('/post/game', (req, res) => {
  knex.postGame(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
    });
});

app.post('/post/participant', (req, res) => {
  knex.postParticipant(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
    });
});

app.listen(process.env.PORT);