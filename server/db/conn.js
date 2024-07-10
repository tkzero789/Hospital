const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

var _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      const db = await client.connect();
      if (db) {
        _db = db.db("hospital");
        console.log("Successfully connected to MongoDB.");
      }
      return _db;
    } catch (err) {
      throw err;
    }
  },

  getDb: function () {
    return _db;
  },
};
