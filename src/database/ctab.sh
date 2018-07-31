#!/bin/bash
psql -d backers_games -f game.sql
psql -d backers_games -f users.sql
psql -d backers_games -f participants.sql
psql -d backers_games -f events.sql
psql -d backers_games -f notifications.sql
psql -d backers_games -f tournaments.sql
