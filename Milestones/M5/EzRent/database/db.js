function createPool() {
  try {
    const mysql = require('mysql2');

    const pool = mysql.createPool({
      host: 'sql9.freemysqlhosting.net',
      port: 3306,
      user: 'sql9587367',
      password: '1w486KvXUN',
      database: 'sql9587367',
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    });
    const promisePool = pool.promise();
    
    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const pool = createPool();

module.exports = {
  connection: async () => pool.getConnection(function(err, connection){
    if(err) {
      reject (err);
    }
    connection.release();
  }),
  execute: (...params) => pool.execute(...params)
};

