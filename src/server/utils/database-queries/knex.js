import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knex = Knex({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
});

export function newUser(username, email, walletAddress) {
  const query = knex
    .insert({
      username: username,
      email: email,
      default_address: walletAddress
    })
    .into('users');

    return query;
};

export function newEvent(organizer, title, isPublic, start, end, location, terms) {
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
  
  