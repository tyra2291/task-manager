import { getDB } from "../config/db.js";

/**
 * Créer une tâche
 */
export const createTask = async ({ title, priority, userId }) => {
  const db = getDB();

  const id = Date.now();

  await db.query(
    "INSERT INTO tasks (id, title, priority, user_id) VALUES (?, ?, ?, ?)",
    [id, title, priority, userId]
  );

  return { id, title, priority };
};

/**
 * Récupérer toutes les tâches d’un utilisateur
 */
export const getTasks = async (userId) => {
  const db = getDB();

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId]
  );

  return rows;
};

/**
 * Récupérer une tâche
 */
export const getTask = async (id, userId) => {
  const db = getDB();

  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return rows[0];
};

/**
 * Mettre à jour une tâche
 */
export const updateTask = async (id, userId, { title, priority }) => {
  const db = getDB();

  const [result] = await db.query(
    "UPDATE tasks SET title = ?, priority = ? WHERE id = ? AND user_id = ?",
    [title, priority, id, userId]
  );

  if (result.affectedRows === 0) return null;

  return getTask(id, userId);
};

/**
 * Supprimer une tâche
 */
export const deleteTask = async (id, userId) => {
  const db = getDB();

  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return result.affectedRows > 0;
};