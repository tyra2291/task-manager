import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";
});

describe("Auth API", () => {

  it("should register a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: `test${Date.now()}@test.com`,
        password: "password123"
      });

    console.log("REGISTER:", res.statusCode, res.body);

    expect(res.statusCode).toBe(201);
  });

  it("should login and return a token", async () => {
    const email = `test${Date.now()}@test.com`;

    await request(app).post("/auth/register").send({
      email,
      password: "password123"
    });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "password123"
      });

    console.log("LOGIN:", res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});