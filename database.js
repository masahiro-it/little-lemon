// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('little_lemon.db');

export const initDatabase = async () => {
  await db.then(async (dbInstance) => {
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL
      );
    `);
  });
};

export const getMenuItems = async () => {
  try {
    const dbInstance = await db;
    const existingData = await dbInstance.getAllAsync('SELECT * FROM menu');
    return existingData.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    }));
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const saveMenuItems = async (menuItems) => {
  try {
    const dbInstance = await db;
    await dbInstance.runAsync('BEGIN TRANSACTION;');
    for (const item of menuItems) {
      await dbInstance.runAsync(
        'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name=?, price=?, description=?, image=?, category=?',
        [item.name, item.price, item.description, item.image, item.category, item.name, item.price, item.description, item.image, item.category]
      );
    }
    await dbInstance.runAsync('COMMIT;');
  } catch (error) {
    console.error('Error saving menu items:', error);
  }
};

export const searchMenuItems = async (searchText, categories = []) => {
  try {
    const dbInstance = await db;
    let query = 'SELECT * FROM menu WHERE 1=1';
    const params = [];

    if (searchText) {
      query += ' AND name LIKE ?';
      params.push(`%${searchText}%`);
    }

    if (categories.length > 0) {
      query += ' AND category IN (' + categories.map(() => '?').join(',') + ')';
      params.push(...categories);
    }

    const results = await dbInstance.getAllAsync(query, params);
    return results.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    }));
  } catch (error) {
    console.error('Error searching menu items:', error);
    return [];
  }
};