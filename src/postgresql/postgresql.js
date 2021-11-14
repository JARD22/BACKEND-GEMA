const {Pool}= require('pg');


const pool = new Pool({
    user: 'xzhsfxrwvdfqdu',
    host: 'ec2-54-221-201-212.compute-1.amazonaws.com',
    database: 'd4ugn4g0ceiip6',
    password: 'bb9cc3a3374586093b2baaadc2fc6895c8b7b6961bedfa5f84acbab21f9d9ce1',
    port: 5432,
    ssl:{rejectUnauthorized:false}
  });

  module.exports=pool;