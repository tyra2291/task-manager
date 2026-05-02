import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

/**
 * Crée un utilisateur
 */
export const createUser = async ({ email, password }) => {
  const db = getDB();

  // Vérifier si l'utilisateur existe déjà
  const [existing] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = Date.now();

  await db.query(
    "INSERT INTO users (id, email, password) VALUES (?, ?, ?)",
    [id, email, hashedPassword]
  );

  return { id, email };
};

/**
 * Trouve un utilisateur par email
 */
export const findUserByEmail = async (email) => {
  const db = getDB();

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0]; // undefined si non trouvé
};

/**
 * Trouve un utilisateur par ID
 */
export const findUserById = async (id) => {
  const db = getDB();

  const [rows] = await db.query(
    "SELECT id, email FROM users WHERE id = ?",
    [id]
  );

  return rows[0];
};