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

