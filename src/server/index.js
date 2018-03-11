import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as knex from './utils/knex';

dotenv.config();
const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/../client/static/'));
app.use(express.static(__dirname + '/../client/static/build'));
app.use(express.static(__dirname + '/../client/static/images'));
app.use(helmet());
app.use(bodyParser.json());

router.get('*', (req, res) => {
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
    .then(data => res.json(data))
    .catch(err => {
      res.sendStatus(500);
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

app.get('/get/user/:name', (req, res) => {
  knex.getUser(req.params.name)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/get/participant/upcoming/events/:id', (req, res) => {
  knex.getParticipantUpcomingEvents(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/get/participant/pending/events/:id', (req, res) => {
  knex.getParticipantPendingEvents(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    })
});

app.get('/get/participant/previous/events/:id', (req, res) => {
  knex.getParticipantPastEvents(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/check/organizer/:id/event/:address', (req, res) => {
  knex.getEventAndOrganizer(req.params.id, req.params.address)
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).json(err);
    });
});

app.get('/get/user/address/:address', (req, res) => {
  knex.getUserAddress(req.params.address) 
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT);