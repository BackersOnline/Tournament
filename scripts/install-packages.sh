if [-d "/var/www/" ]; then
  rm -rf /var/www/
fi

mkdir /var/www/
cd /var/www/
sudo yarn install
