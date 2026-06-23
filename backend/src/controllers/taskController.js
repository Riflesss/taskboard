const { query } = require('../db');

async function getTasks(req, res, next) {
  try {
    const result = await query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description = '', status = 'pending' } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const result = await query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;
    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push('title = $' + (fields.length + 1));
      values.push(title);
    }
    if (description !== undefined) {
      fields.push('description = $' + (fields.length + 1));
      values.push(description);
    }
    if (status !== undefined) {
      fields.push('status = $' + (fields.length + 1));
      values.push(status);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    values.push(id);
    const result = await query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
