import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../src/app.js";

let token;

beforeEach(async () => {
  process.env.JWT_SECRET = "testsecret";

  const email = `test${Date.now()}@test.com`;

  // register
  await request(app).post("/auth/register").send({
    email,
    password: "password123"
  });

  // login
  const res = await request(app).post("/auth/login").send({
    email,
    password: "password123"
  });

  token = res.body.token;
});

describe("Tasks API", () => {

  it("should create a task with valid token", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test task",
        priority: "high"
      });

    console.log(res.statusCode, res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  it("should fail without token", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "No auth",
        priority: "low"
      });

    expect(res.statusCode).toBe(401);
  });

});