# Tournament
This repository contains the source code for the Backers.Games application. Create a custom game, and payout winners with cryptocurrencies. Decentralized gaming.

## Run Locally
This application requires some downloads. Before cloning this project, ensure you have all requirements for your local enviornment: [Node](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/lang/en/docs/install/), [PostgreSQL](https://www.postgresql.org/download/), and [Git](https://git-scm.com/downloads).

##### Setting Up Postgres
To ensure you can test the app correctly, you will need to set up a local database. This will show you how to create your database with the postgres command line on MacOS (*command line may be different using an alternative OS*):

```
$ brew services start postgresql
$ createuser [your user name]
$ createdb -O [your user name] backers_games
```
After you have cloned the repository from Github, run these commands:

```
$ cd Tournament/src/database
$ psql -d backers_games -f users.sql
*repeat above step for all files under database/*
```

Your database should now be properly set up.

##### Clone Repository

Follow the command prompts to clone the repository from Github:

```
$ git clone 
```
