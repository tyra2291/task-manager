import * as taskService from "../services/taskService.js";
import { taskSchema } from "../validators/taskValidator.js";

export const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;

    const task = await taskService.createTask({
      title,
      priority,
      userId: req.user.userId
    });

    res.status(201).json(task);

  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.user.userId);
  res.json(tasks);
};

export const getTask = async (req, res) => {
  const task = await taskService.getTask(
    Number(req.params.id),
    req.user.userId
  );

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await taskService.updateTask(
    Number(req.params.id),
    req.user.userId,
    req.body
  );

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const success = await taskService.deleteTask(
    Number(req.params.id),
    req.user.userId
  );

  if (!success) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};