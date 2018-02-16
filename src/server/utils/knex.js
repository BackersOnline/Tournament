import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knex = Knex({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
});

export function postUser(data) {
  const query = knex
    .insert({
      username: data.username,
      email: data.email,
      default_address: data.walletAddress
    })
    .into('users');

    return query;
};

export function postEvent(data) {
  const query = knex
    .insert({
      organizer_id: data.organizer,
      title: data.title,
      public: data.isPublic,
      start_date: data.start,
      end_date: data.end,
      location: data.location,
      terms: data.terms
    })
    .into('events');
  
    return query;
};

export function postTournament(data) {
  const query = knex
    .insert({
      event_id: data.eventId,
      max_participants: data.max,
      buyin: data.buyIn,
      guarantee: data.guarantee,
      terms: data.terms
    })
    .into('tournaments');

    return query;
};
  
export function postGame(data) {
  const query = knex  
    .insert({
      event_id: data.eventId,
      max_participants: data.max,
      max_buyin: data.maxBuyIn,
      min_buyin: data.minBuyIn,
      terms: data.terms
    })
    .into('game');

    return query;
};

export function postParticipant(data) {
  const query = knex
    .insert({
      event_id: data.eventId,
      user_id: data.userId,
      start_date: data.start,
      end_date: data.end,
      paid: data.paid,
      prize: data.prize,
      note: data.note
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
  
export function getParticipantEvents(userId) {
  const query = knex
    .table('participants')
    .where({
      user_id: userId
    })
    .innerJoin('events', 'event_id', '=', 'id');

    return query;
};