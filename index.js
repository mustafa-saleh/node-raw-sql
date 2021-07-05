const express = require("express");
const { connectToDb } = require("./db/db");
const { selectTable, selectRecord } = require("./db/db-repo");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  const q = "SELECT * FROM cars";
  const result = await selectTable(q);
  res.status(200).json({ status: "Success", result });
});

app.get("/:id", async (req, res) => {
  const q = `SELECT * FROM cars WHERE id = ${req.params.id}`;
  const result = await selectRecord(q);
  res.status(200).json({ status: "Success", result });
});

(async function start() {
  try {
    await connectToDb();
    console.log(`DB started Successfully!`);
    app.listen(port, () =>
      console.log(`SERVER STARTED ON http://localhost:${port}`)
    );
  } catch (error) {
    console.log(`SERVER FAILED TO START`);
  }
})();
