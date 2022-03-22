-- create databases
CREATE DATABASE IF NOT EXISTS `challenge_api_development`;
CREATE DATABASE IF NOT EXISTS `challenge_api_test`;

-- create root user and grant rights
CREATE USER 'globo'@'%' IDENTIFIED BY '8dukpJfd8w';
GRANT ALL PRIVILEGES ON *.* TO 'globo'@'%';
