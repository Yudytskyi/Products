const Sequelize = require('sequelize');
const { Client } = require('pg');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const { database, username, password, host, dialect } = config;
const conStringPri = `postgres://${username}:${password}@${host}/${dialect}`;
const conStringPost = `postgres://${username}:${password}@${host}/${database}`;

const initDB = callback => {
  const client = new Client(config);
  client.connect(conStringPri, (err, client, done) => {
    client.query(`CREATE DATABASE ${dbName}`, () => {
      callback(new Sequelize(conStringPost));
      client.end();
    });
  });
};

initDB(() => {});

// module.exports = initDB;
