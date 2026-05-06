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

it("should get all tasks for the user", async () => {

  // create task
  await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Task 1",
      priority: "high"
    });

  const res = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);

  expect(res.body.length).toBe(1);
  expect(res.body[0].title).toBe("Task 1");
});

it("should update a task", async () => {

  // create task
  const createRes = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Old title",
      priority: "low"
    });

  const taskId = createRes.body.id;

  // update task
  const updateRes = await request(app)
    .put(`/tasks/${taskId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "New title",
      priority: "high"
    });

  expect(updateRes.statusCode).toBe(200);

  expect(updateRes.body.title).toBe("New title");
  expect(updateRes.body.priority).toBe("high");
});


});