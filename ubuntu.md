# Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

# Node
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Postgres
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get install postgresql postgresql-contrib

# Backers roles
psql
CREATE ROLE backers SUPERUSER LOGIN REPLICATION CREATEDB CREATEROLE;
CREATE ROLE ubuntu SUPERUSER LOGIN REPLICATION CREATEDB CREATEROLE;
\q

# Backers DB
sudo su - postgres
createdb -O backers backers_games

# Backers tables
cd /home/backersTournament/src/database/
./ctab.sh
