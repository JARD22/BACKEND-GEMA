const {Pool}= require('pg');


const pool = new Pool({
    user: 'postgre',
    host: 'localhost',
    database: 'GEMAV1.1',
    password: 'password',
    port: 5433,
  });

  module.exports=pool;