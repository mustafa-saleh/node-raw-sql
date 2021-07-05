const { connectToDb } = require("./db");

async function selectRecord(query) {
  if (!query) return null;

  return new Promise(async (resolve, reject) => {
    const db = await connectToDb();
    db.serialize(function () {
      db.get(query, [], (err, row) => {
        if (err) {
          console.log(`DB GET ERROR: ${err}`);
          reject(err);
          return;
        }
        resolve(row);
      });
    });
    db.close();
  });
}

async function selectTable(query) {
  if (!query) return null;

  return new Promise(async (resolve, reject) => {
    const db = await connectToDb();
    db.serialize(function () {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.log(`DB ALL ERROR: ${err}`);
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
    db.close();
  });
}

module.exports = { selectRecord, selectTable };
