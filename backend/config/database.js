
async function testConnection(db) {
  try {
    await db.sequelize.authenticate();
    console.log('🟢🟢 --- Database connection have been etablish --- 🟢🟢');
  } catch (err) {
    console.log('🔴🔴 --- Unable to connect to the database --- 🔴🔴', err);
  }
}

async function handleExit(db) {
  console.log('🔴🔴 --- Closing the connection --- 🔴🔴');
  try {
    await db.sequelize.close();
    console.log('🟢 -- Database connection closed successfully -- 🟢');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
}
module.exports = { testConnection, handleExit };

