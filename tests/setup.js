import dotenv from "dotenv";
dotenv.config();

import { connectDB, closeDB, getDB } from "../src/config/db.js";

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";
  await connectDB();
});

beforeEach(async () => {
  const db = getDB();

  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("DELETE FROM tasks");
  await db.query("DELETE FROM users");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
});

afterAll(async () => {
  await closeDB(); // 
});