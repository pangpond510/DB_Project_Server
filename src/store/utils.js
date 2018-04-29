const { connection } = require('../constant.js');

const query = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const openConnection = () => {
  connection.connect();
};

const closeConnection = () => {
  connection.end();
};

module.exports = {
  query,
  openConnection,
  closeConnection
};

/*
const query = () => {
  var sql_args = [];
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  var callback = args[args.length - 1]; //last arg is callback
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    if (args.length > 2) {
      sql_args = args[1];
    }
    connection.query(args[0], sql_args, (err, results) => {
      connection.release(); // always put connection back in pool after last query
      if (err) {
        console.log(err);
        return callback(err);
      }
      callback(null, results);
    });
  });
};
*/
