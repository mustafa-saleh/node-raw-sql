const sqlite3 = require("sqlite3").verbose();

const dbName = "main.sqlite3";

const connectToDb = async () => {
  return new Promise((res, rej) => {
    const db = new sqlite3.Database(dbName, (err) => {
      if (err) {
        console.log(`DB ${dbName} Failed to Start/Connect`);
        rej(err);
        return;
      }
    });
    res(db);
  });
};

module.exports = { connectToDb };
