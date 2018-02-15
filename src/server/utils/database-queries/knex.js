import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knex = Knex({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
});

export function postUser(username, email, walletAddress) {
  const query = knex
    .insert({
      username: username,
      email: email,
      default_address: walletAddress
    })
    .into('users');

    return query;
};

export function postEvent(organizer, title, isPublic, start, end, location, terms) {
  const query = knex
    .insert({
      organizer_id: organizer,
      title: title,
      public: isPublic,
      start_date: start,
      end_date: end,
      location: location,
      terms: terms
    })
    .into('events');
  
    return query;
};

export function postTournament(eventId, max, buyIn, guarantee, terms) {
  const query = knex
    .insert({
      event_id: eventId,
      max_participants: max,
      buyin: buyIn,
      guarantee: guarantee,
      terms: terms
    })
    .into('tournaments');

    return query;
};
  
export function postGame(eventId, max, maxBuyIn, minBuyIn, terms) {
  const query = knex  
    .insert({
      event_id: eventId,
      max_participants: max,
      max_buyin: maxBuyIn,
      min_buyin: minBuyIn,
      terms: terms
    })
    .into('game');

    return query;
};

export function postParticipant(eventId, userId, start, end, paid, prize, note) {
  const query = knex
    .insert({
      event_id: eventId,
      user_id: userId,
      start_date: start,
      end_date: end,
      paid: paid,
      prize: prize,
      note: note
    })
    .into('participants');

    return query;
};

export function getUser(username) {
  const query = knex
    .table('users')
    .where({
      username: username
    });

    return query;
};
  