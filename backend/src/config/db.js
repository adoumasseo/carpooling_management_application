const options = {
  connect(client) {
    console.log(`🟢 ---- Connected successfully: ${client.connectionParameters.database} ---- 🟢`);
  },
  disconnect(client) {
    console.log(`🔴 ---- Disconnected from database: ${client.connectionParameters.database} 🔴 ----`);
  },
};
const pgp = require('pg-promise')(options)

/**
   * Make a connection to the database and handle closure when node process exit
  */
const connectToDatabase = async () => {
  try {
    const db = pgp(process.env.DATABASE_URL_DEV);
    process.on('SIGINT', () => handleDisconnect(db));
    process.on('SIGTERM', () => handleDisconnect(db));
    
    return db;
  } catch (err) {
    console.log(`🔴 ------ Unable to connect to the database error : ${err} ------ 🔴`);
    process.exit(1);
  }
}
/**
   * A handler to close the database.
   * @param {databaseCon} The connection to close
   */
const handleDisconnect = async (databaseCon) => {
  try {
     if (databaseCon) {
       await databaseCon.$pool.end();
     }
     process.exit(0);
   } catch (err) {
     console.error('🔴 Error while closing PostgreSQL connection:', err.message);
     process.exit(1);
   }
}