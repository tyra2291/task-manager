import mysql from "mysql2/promise";

let connection;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const connectDB = async () => {
  let retries = 10;

  while (retries) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      console.log(" DB connected");
      return;
    } catch (err) {
      console.log(" Waiting for DB...");
      retries--;
      await sleep(2000);
    }
  }

  throw new Error(" Unable to connect to DB");
};

export const getDB = () => {
  if (!connection) {
    throw new Error("DB not initialized");
  }
  return connection;
};